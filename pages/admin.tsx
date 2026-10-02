import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { ReviewRow } from "@/lib/supabaseAdmin";

type Filter = "pending" | "approved" | "all";

/* ── Login ───────────────────────────────────────────────────────────────── */
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [busy, setBusy]         = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (res.ok) onLogin();
    else setError("Incorrect password.");
  }

  return (
    <form onSubmit={submit} className="card p-6 md:p-8 max-w-sm mx-auto space-y-5">
      <h1 className="font-serif text-2xl text-navy-800">Admin Login</h1>
      <div>
        <label className="label-field" htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          autoComplete="current-password"
          autoFocus
        />
      </div>
      {error && <p className="font-sans text-sm text-blush-600">{error}</p>}
      <button type="submit" disabled={busy || !password} className="btn-primary w-full disabled:opacity-60">
        {busy ? "Logging in…" : "Log In"}
      </button>
    </form>
  );
}

/* ── Review row ──────────────────────────────────────────────────────────── */
function ReviewItem({
  review, onApprove, onDelete,
}: {
  review: ReviewRow;
  onApprove: (approved: boolean) => void;
  onDelete: () => void;
}) {
  const date = new Date(review.created_at).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <article className="card p-5 flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-sans font-semibold text-sm" style={{ color: "#1a1a1a" }}>{review.name}</p>
          <p className="font-sans text-xs text-neutral-400">{review.location} · {date}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-sans text-sm" style={{ color: "#e8b14a" }} aria-label={`${review.rating} out of 5 stars`}>
            {"★".repeat(review.rating)}<span className="text-neutral-300">{"★".repeat(5 - review.rating)}</span>
          </span>
          <span className={review.approved ? "chip-brand" : "chip-blush"}>
            {review.approved ? "Live" : "Pending"}
          </span>
        </div>
      </div>
      <p className="font-sans text-sm text-neutral-600 leading-relaxed whitespace-pre-line">{review.message}</p>
      <div className="flex flex-wrap gap-2 pt-1">
        {review.approved ? (
          <button onClick={() => onApprove(false)} className="btn-outline-brand btn-sm">Hide from website</button>
        ) : (
          <button onClick={() => onApprove(true)} className="btn-primary btn-sm">Approve</button>
        )}
        <button onClick={onDelete} className="btn-ghost btn-sm text-blush-600">Delete</button>
      </div>
    </article>
  );
}

/* ── Main ────────────────────────────────────────────────────────────────── */
export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [reviews, setReviews]   = useState<ReviewRow[]>([]);
  const [filter, setFilter]     = useState<Filter>("pending");
  const [error, setError]       = useState("");

  const load = useCallback(async () => {
    setError("");
    const res = await fetch("/api/admin/reviews");
    if (res.status === 401) return setLoggedIn(false);
    if (!res.ok) return setError("Could not load reviews. Check the database settings.");
    const { reviews } = await res.json();
    setReviews(reviews);
  }, []);

  useEffect(() => {
    fetch("/api/admin/login")
      .then((r) => r.json())
      .then(({ loggedIn }) => setLoggedIn(loggedIn))
      .catch(() => setLoggedIn(false));
  }, []);

  useEffect(() => {
    if (loggedIn) load();
  }, [loggedIn, load]);

  async function update(id: string, approved: boolean) {
    const res = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved }),
    });
    if (res.ok) setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved } : r)));
    else setError("Could not update the review.");
  }

  async function remove(id: string) {
    if (!confirm("Delete this review permanently?")) return;
    const res = await fetch("/api/admin/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setReviews((prev) => prev.filter((r) => r.id !== id));
    else setError("Could not delete the review.");
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setLoggedIn(false);
    setReviews([]);
  }

  const pendingCount = reviews.filter((r) => !r.approved).length;
  const visible = reviews.filter((r) =>
    filter === "all" ? true : filter === "approved" ? r.approved : !r.approved
  );

  return (
    <>
      <Head>
        <title>Admin | Dr. Nisha Tabassum</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <main className="min-h-screen bg-warm-50 py-10 md:py-16">
        <div className="container-site max-w-3xl">
          {loggedIn === null && <p className="font-sans text-sm text-neutral-400 text-center">Loading…</p>}

          {loggedIn === false && <LoginForm onLogin={() => setLoggedIn(true)} />}

          {loggedIn && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h1 className="font-serif text-3xl text-navy-800">Patient Reviews</h1>
                <div className="flex gap-2">
                  <Link href="/" className="btn-ghost btn-sm">View site</Link>
                  <button onClick={logout} className="btn-outline-brand btn-sm">Log out</button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6" role="tablist">
                {([
                  ["pending",  `Pending (${pendingCount})`],
                  ["approved", `Live (${reviews.length - pendingCount})`],
                  ["all",      `All (${reviews.length})`],
                ] as [Filter, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={filter === key}
                    onClick={() => setFilter(key)}
                    className={filter === key ? "btn-primary btn-sm" : "btn-ghost btn-sm"}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {error && (
                <p className="font-sans text-sm text-blush-600 bg-blush-50 border border-blush-200 rounded-xl px-4 py-3 mb-6">
                  {error}
                </p>
              )}

              <div className="space-y-4">
                {visible.length === 0 ? (
                  <p className="font-sans text-sm text-neutral-400 text-center py-10">No reviews here.</p>
                ) : (
                  visible.map((r) => (
                    <ReviewItem
                      key={r.id}
                      review={r}
                      onApprove={(approved) => update(r.id, approved)}
                      onDelete={() => remove(r.id)}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
