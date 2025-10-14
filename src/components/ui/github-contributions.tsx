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

  React.useEffect(() => {
    let aborted = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams({ user });
        if (from) params.set('from', from);
        if (to) params.set('to', to);
        const res = await fetch(`/api/github/contributions?${params.toString()}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const text = await res.text();
        if (!aborted) setSvg(text);
      } catch (e: any) {
        if (!aborted) setError(e?.message || 'Failed to load');
      } finally {
        if (!aborted) setLoading(false);
      }
    }
    load();
    return () => { aborted = true; };
  }, [user, from, to]);

  return (
    <div className={className}>
      {loading && (
        <div className="text-sm text-neutral-400">Loading contributions…</div>
      )}
      {error && (
        <div className="text-sm text-red-400">{error}</div>
      )}
      {!loading && !error && svg && (
        <div
          className="w-full overflow-x-auto rounded-lg border border-white/10 bg-[#0f1724] p-4"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </div>
  );
}
