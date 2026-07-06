"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        {/* Headline */}
        <h2>SomeThing went wrong</h2>

        {/* Description */}
        <p>{error.message}</p>

        {/* Action */}
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
