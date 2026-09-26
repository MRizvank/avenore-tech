import { redirect } from "next/navigation";

export default function ArPage() {
  // For static export, redirect might not work server-side, so we use a client-side redirect or meta refresh.
  // Actually, Next.js supports static redirects in next.config.ts, but for output: export it's tricky.
  // Let's use a meta refresh for the static HTML export.
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0; url=/ar/kuwait-app-development" />
      </head>
      <body>
        <p>Redirecting to Arabic Home...</p>
      </body>
    </html>
  );
}
