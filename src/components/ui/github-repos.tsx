"use client";
import React from 'react';

interface RepoItem {
  id: number;
  name: string;
  full_name?: string;
  html_url: string;
  description?: string | null;
  language?: string | null;
  topics?: string[];
  stargazers_count?: number;
  forks_count?: number;
  updated_at?: string;
  homepage?: string | null;
  license?: string | null;
}

interface Props {
  user: string;
  limit?: number; // show only first N
  showTopics?: boolean;
  className?: string;
  fields?: string; // override field list passed to API
  sortBy?: 'stars' | 'updated'; // local sort if needed
  cacheBust?: number; // optional external cache-bust value (e.g. from parent Refresh button)
}

export default function GitHubRepos({ user, limit = 6, showTopics = true, className, fields, sortBy = 'updated', cacheBust }: Props) {
  const [repos, setRepos] = React.useState<RepoItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [nonce, setNonce] = React.useState(0);

  React.useEffect(() => {
    let aborted = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        // include a cache-busting param so deployed edge cache is bypassed when nonce or parent cacheBust changes
        // prefer an external cacheBust prop (from the Refresh button) so remounting with a new key forces a unique URL
        const cacheValue = cacheBust !== undefined ? cacheBust : nonce;
        const params = new URLSearchParams({ user, per_page: '100', cache_bust: String(cacheValue) });
        if (fields) params.set('fields', fields);
        const res = await fetch(`/api/github/repos?${params.toString()}`);
        if (!res.ok) {
          const txt = await res.text();
            throw new Error(`Request failed ${res.status}: ${txt.slice(0,120)}`);
        }
        const data: RepoItem[] = await res.json();
        if (aborted) return;
        let processed = data.slice();
        // Local sort if requested
        if (sortBy === 'stars') {
          processed.sort((a,b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
        } else if (sortBy === 'updated') {
          processed.sort((a,b) => new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime());
        }
        if (limit > 0) processed = processed.slice(0, limit);
        setRepos(processed);
      } catch (e) {
        if (!aborted) setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        if (!aborted) setLoading(false);
      }
    }
    load();
    return () => { aborted = true; };
  }, [user, limit, fields, sortBy, nonce]);

  // Auto-refresh every 10 seconds
  // Auto-refresh disabled: manual Refresh button or Retry will increment `nonce`.

  return (
    <div className={className}>
      {loading && <div className="text-sm text-neutral-400">Loading repositories…</div>}
      {error && (
        <div className="text-sm text-red-400 flex items-center gap-3">
          <span>{error}</span>
          <button onClick={() => setNonce(n => n + 1)} className="rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20">Retry</button>
        </div>
      )}
      {!loading && !error && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map(r => (
            <li key={r.id} className="group relative rounded-lg border border-white/10 bg-[#0b1019] p-4 hover:border-white/30 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-2">
                <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="font-medium text-sm md:text-base hover:underline">
                  {r.name}
                </a>
                {r.stargazers_count ? (
                  <span className="text-xs text-yellow-400/80">★ {r.stargazers_count}</span>
                ) : null}
              </div>
              {r.description && (
                <p className="text-xs md:text-sm text-white/60 line-clamp-3 mb-3">{r.description}</p>
              )}
              <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wide text-white/50">
                {r.language && <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">{r.language}</span>}
                {showTopics && r.topics?.slice(0,3).map(t => (
                  <span key={t} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">{t}</span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-white/40">
                {r.updated_at && <span>Updated {new Date(r.updated_at).toLocaleDateString()}</span>}
                {r.forks_count ? <span>Forks {r.forks_count}</span> : null}
              </div>
            </li>
          ))}
          {repos.length === 0 && (
            <li className="text-sm text-white/50">No repositories found.</li>
          )}
        </ul>
      )}
    </div>
  );
}
