import { NextResponse } from 'next/server';

function formatDate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function extractContribSvg(html: string): string | null {
  // 1) Prefer class used in the contributions graph
  const byClass = html.match(/<svg[^>]*class=\"[^\"]*js-calendar-graph-svg[^\"]*\"[\s\S]*?<\/svg>/i);
  if (byClass?.[0]) return byClass[0];
  // 2) Any svg containing data-date rects
  const all = html.match(/<svg[\s\S]*?<\/svg>/gi) || [];
  for (const s of all) {
    if (/data-date=\"\d{4}-\d{2}-\d{2}\"/.test(s)) return s;
  }
  // 3) Some pages wrap the graph in <turbo-frame> or have a container with data-graph-url; try to dereference
  // Not followed here (no DOM parsing), but keep as a future hook.
  // 4) Last resort: return first svg
  return all[0] ?? null;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get('user');
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');

    if (!user) {
      return NextResponse.json({ error: 'Missing user parameter' }, { status: 400 });
    }

    const to = toParam ? new Date(toParam) : new Date();
    const from = fromParam ? new Date(fromParam) : new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

    const baseHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://github.com/',
    } as const;

    const urls = [
      // Contributions with range
      `https://github.com/users/${encodeURIComponent(user)}/contributions?from=${formatDate(from)}&to=${formatDate(to)}`,
      // Contributions without range
      `https://github.com/users/${encodeURIComponent(user)}/contributions`,
      // Fallback: user profile (the graph is often embedded here too)
      `https://github.com/${encodeURIComponent(user)}`,
    ];

    let svgRaw: string | null = null;
    let lastStatus: number | null = null;

    for (const url of urls) {
      const res = await fetch(url, { headers: baseHeaders, next: { revalidate: 21600 } });
      lastStatus = res.status;
      if (!res.ok) continue;
      const html = await res.text();
      svgRaw = extractContribSvg(html);
      // Fallback: some pages include a data-graph-url attribute pointing to the actual SVG fragment
      if (!svgRaw) {
        const m = html.match(/data-graph-url=\"([^\"]+)\"/i);
        if (m?.[1]) {
          const graphUrl = new URL(m[1], 'https://github.com').toString();
          const fragRes = await fetch(graphUrl, { headers: baseHeaders, next: { revalidate: 21600 } });
          if (fragRes.ok) {
            const fragHtml = await fragRes.text();
            svgRaw = extractContribSvg(fragHtml);
          }
        }
      }
      if (svgRaw) break;
    }
    if (!svgRaw) {
      const hint = lastStatus ? ` (last status ${lastStatus})` : '';
      return NextResponse.json({ error: `Could not locate contributions SVG in GitHub response${hint}` }, { status: 502 });
    }

    const hasPreserve = /preserveAspectRatio=/i.test(svgRaw);
    let svg = svgRaw
      // Ensure width is responsive (handle both ' and ")
      .replace(/width=\"\d+\"/i, 'width=\"100%\"')
      .replace(/width='\d+'/i, "width='100%'")
      // Remove height to let it scale
      .replace(/height=\"\d+\"/i, '')
      .replace(/height='\d+'/i, '')
      // Add preserveAspectRatio if missing
      .replace('<svg', hasPreserve ? '<svg' : '<svg preserveAspectRatio=\"xMidYMid meet\"');

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=21600',
      },
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 500 });
  }
}
