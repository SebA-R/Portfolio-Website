// PostHog's library files are versioned in the URL (?v=1.369.0), so they can
// be cached for a year. Everything else (config, event ingestion) passes
// through unchanged.
const STATIC_PREFIX = '/static/';
const STATIC_CACHE_CONTROL = 'public, max-age=31536000, immutable';

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const target = new URL(url.pathname + url.search, 'https://us.i.posthog.com');
    const req = new Request(target, request);
    req.headers.set('host', 'us.i.posthog.com');
    const response = await fetch(req);

    const isVersionedStatic = url.pathname.startsWith(STATIC_PREFIX) && url.searchParams.has('v');
    if (!isVersionedStatic || !response.ok) {
      return response;
    }
    const cached = new Response(response.body, response);
    cached.headers.set('Cache-Control', STATIC_CACHE_CONTROL);
    return cached;
  },
};
