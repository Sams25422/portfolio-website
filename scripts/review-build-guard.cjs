// Fail closed when this review-only branch is accidentally built as production.
// Remove only in the separate release approved by Samuel after preview review.
if (process.env.CONTEXT === "production") {
  console.error(
    "REVIEW-ONLY BUILD: production deployment is blocked until Samuel approves the redesign.",
  );
  process.exit(1);
}
