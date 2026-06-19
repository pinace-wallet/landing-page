/**
 * Tiny on-UI "pending" tag marking an enhancement slot for the team.
 * The detail (what to add) lives in the hover title to keep the UI clean.
 * Place inside a `relative` parent (pins top-right) or pass `inline`.
 * Hide all at once with NEXT_PUBLIC_HIDE_NOTES=1. Remove before production.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DevNote(_props: {
  children: React.ReactNode;
  inline?: boolean;
  className?: string;
}) {
  return null;
}
