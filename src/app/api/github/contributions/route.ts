import { NextResponse } from 'next/server';

function formatDate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
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

    const url = `https://github.com/users/${encodeURIComponent(user)}/contributions?from=${formatDate(from)}&to=${formatDate(to)}`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      // Revalidate every 6 hours to avoid hammering GitHub
      next: { revalidate: 21600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `GitHub responded with ${res.status}` }, { status: 502 });
    }

    const html = await res.text();

    // Prefer SVG with the known class name GitHub uses
    const byClass = html.match(/<svg[^>]*class=\"[^\"]*js-calendar-graph-svg[^\"]*\"[\s\S]*?<\/svg>/i);
    let svgRaw = byClass?.[0] || null;

    // Fallback: Any SVG that contains contribution day rects (data-date="YYYY-MM-DD")
    if (!svgRaw) {
      const all = html.match(/<svg[\s\S]*?<\/svg>/gi) || [];
      for (const candidate of all) {
        if (/data-date=\"\d{4}-\d{2}-\d{2}\"/.test(candidate)) {
          svgRaw = candidate;
          break;
        }
      }
      if (!svgRaw && all.length > 0) {
        svgRaw = all[0] ?? null;
      }
    }

    if (!svgRaw) {
      return NextResponse.json({ error: 'Could not locate contributions SVG in GitHub response' }, { status: 502 });
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
