"use client";

import React from 'react';

type Props = {
  user: string;
  from?: string; // yyyy-mm-dd
  to?: string;   // yyyy-mm-dd
  className?: string;
};

export default function GitHubContributions({ user, from, to, className }: Props) {
  const [svg, setSvg] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [nonce, setNonce] = React.useState(0);

  const load = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({ user });
      if (from) params.set('from', from);
      if (to) params.set('to', to);
      const res = await fetch(`/api/github/contributions?${params.toString()}`);
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok) {
        let detail = '';
        if (contentType.includes('application/json')) {
          const j = await res.json().catch(() => null);
          detail = j?.error ? `: ${j.error}` : '';
        } else {
          const t = await res.text().catch(() => '');
          detail = t ? `: ${t.slice(0, 200)}` : '';
        }
        throw new Error(`Request failed ${res.status}${detail}`);
      }
      const text = await res.text();
      setSvg(text);
    } catch (e: any) {
      setSvg(null);
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [user, from, to]);

  React.useEffect(() => {
    load();
  }, [load, nonce]);

  return (
    <div className={className}>
      {loading && (
        <div className="text-sm text-neutral-400">Loading contributions…</div>
      )}
      {error && (
        <div className="text-sm text-red-400 flex items-center gap-3">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setNonce((n) => n + 1)}
            className="rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
          >
            Retry
          </button>
        </div>
      )}
      {!loading && !error && svg && (
        <div
          className="w-full overflow-x-auto rounded-lg border border-white/10 bg-[#0f1724] p-4"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </div>
  );
}
