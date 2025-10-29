import { NextResponse } from 'next/server';

// Simple proxy to GitHub public repos API with light filtering and caching.
// GET /api/github/repos?user=<username>&page=1&per_page=30&sort=updated
// Response: JSON array of repositories (subset of fields by default)

const GITHUB_API = 'https://api.github.com';

interface RawRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  archived: boolean;
  disabled: boolean;
  visibility?: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  license?: { spdx_id?: string | null } | null;
  [key: string]: unknown; // allow extra fields from GitHub we don't map
}

interface PublicRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  archived: boolean;
  disabled: boolean;
  visibility?: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  license: string | null;
}

function pickRepoFields(repo: RawRepo): PublicRepo {
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

    // If the client requested a cache_bust, bypass Next/Vercel edge caching for the
    // outbound GitHub request so we get fresh data from GitHub.
    const cacheBust = searchParams.get('cache_bust');
    // Build fetch options differently depending on whether we want to bypass caching.
    const baseHeaders = {
      'User-Agent': 'Roy-Portfolio-App',
      'Accept': 'application/vnd.github+json',
    };

    const fetchOpts = cacheBust
      ? { headers: baseHeaders, cache: 'no-store' }
      : { headers: baseHeaders, next: { revalidate: 3600 } };

  const res = await fetch(url, fetchOpts as unknown as RequestInit);

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `GitHub responded ${res.status}: ${text.slice(0, 200)}` }, { status: 502 });
    }

  const data: unknown = await res.json();

    // Optional field filtering
    const fields = (searchParams.get('fields') || '').split(',').map(s => s.trim()).filter(Boolean);
  const payload: RawRepo[] = Array.isArray(data) ? (data as RawRepo[]) : [];

    let output: Array<PublicRepo | Record<string, unknown>>;
    if (fields.length > 0) {
      output = payload.map((repo: RawRepo) => {
        const picked = pickRepoFields(repo);
        const obj: Record<string, unknown> = {};
        for (const f of fields) {
          if (Object.prototype.hasOwnProperty.call(picked, f)) {
            obj[f] = (picked as unknown as Record<string, unknown>)[f];
          }
        }
        return obj;
      });
    } else {
      output = payload.map(pickRepoFields);
    }

    // If the client included a cache_bust param, prefer a non-cached response so
    // refresh actions always get fresh data from the server instead of an edge cache.
    const headers: Record<string,string> = cacheBust
      ? { 'Cache-Control': 'no-store, no-cache, max-age=0, must-revalidate' }
      : { 'Cache-Control': 'public, max-age=0, s-maxage=3600' };

    return NextResponse.json(output, {
      headers,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
