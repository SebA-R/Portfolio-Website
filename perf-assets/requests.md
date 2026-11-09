# Requests for one visit plus a full scroll (local server, caching on)

Server log, font files:
- main: 4 requests (next/font Soria woff2 + Vercetti woff, troika soria-font.ttf + Vercetti-Regular.woff)
- stack: 2 requests (/soria-font.ttf, /Vercetti-Regular.woff)

Browser, third-party: main loads googletagmanager.com/gtag/js and sends 2 google-analytics.com/g/collect beacons; the stack makes no Google Analytics requests.
CLS stays 0-0.004.
