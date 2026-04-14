// Reverse proxy for PostHog — routes /ingest/* to us.i.posthog.com
// This prevents ad blockers from blocking PostHog requests.
export async function onRequest(context: { request: Request }): Promise<Response> {
  const url = new URL(context.request.url);
  const target = new URL(
    url.pathname.replace(/^\/ingest/, '') + url.search,
    'https://us.i.posthog.com'
  );

  const req = new Request(target, context.request);
  req.headers.set('host', 'us.i.posthog.com');

  return fetch(req);
}
