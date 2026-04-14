export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const target = new URL(url.pathname + url.search, 'https://us.i.posthog.com');
    const req = new Request(target, request);
    req.headers.set('host', 'us.i.posthog.com');
    return fetch(req);
  },
};
