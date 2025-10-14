import { NextResponse } from 'next/server';

// Simple proxy to GitHub public repos API with light filtering and caching.
// GET /api/github/repos?user=<username>&page=1&per_page=30&sort=updated
// Response: JSON array of repositories (subset of fields by default)

const GITHUB_API = 'https://api.github.com';

function pickRepoFields(repo: any) {
  return {
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    html_url: repo.html_url,
    description: repo.description,
    language: repo.language,
    topics: repo.topics,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    open_issues_count: repo.open_issues_count,
    archived: repo.archived,
    disabled: repo.disabled,
    visibility: repo.visibility,
    created_at: repo.created_at,
    updated_at: repo.updated_at,
    pushed_at: repo.pushed_at,
    homepage: repo.homepage,
    license: repo.license?.spdx_id || null,
  };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get('user');
    const page = searchParams.get('page') || '1';
    const per_page = searchParams.get('per_page') || '30';
    const sort = searchParams.get('sort') || 'updated';

    if (!user) {
      return NextResponse.json({ error: 'Missing user parameter' }, { status: 400 });
    }

    const url = `${GITHUB_API}/users/${encodeURIComponent(user)}/repos?type=public&sort=${encodeURIComponent(sort)}&page=${encodeURIComponent(page)}&per_page=${encodeURIComponent(per_page)}`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Roy-Portfolio-App',
        'Accept': 'application/vnd.github+json',
      },
      // Cache at the edge for 1 hour
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `GitHub responded ${res.status}: ${text.slice(0, 200)}` }, { status: 502 });
    }

    const data = await res.json();

    // Optional field filtering
    const fields = (searchParams.get('fields') || '').split(',').map(s => s.trim()).filter(Boolean);
    let payload = Array.isArray(data) ? data : [];

    if (fields.length > 0) {
      payload = payload.map((repo: any) => {
        const picked = pickRepoFields(repo);
        const obj: Record<string, unknown> = {};
        for (const f of fields) {
          if (f in picked) obj[f] = (picked as any)[f];
        }
        return obj;
      });
    } else {
      payload = payload.map((repo: any) => pickRepoFields(repo));
    }

    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=3600',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
