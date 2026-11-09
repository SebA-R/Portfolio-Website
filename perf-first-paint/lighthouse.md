# Lighthouse 12.6, local static build, main -> stack top

| Run | Perf | SEO | LCP | TBT | Weight |
|---|---|---|---|---|---|
| Mobile, applied throttling (devtools) | 66 -> 99 | 92 -> 100 | 21.24 s -> 1.50 s | 2 -> 32 ms | 5405 -> 3070 KB |
| Mobile, simulated (median of 2) | 50 -> 72 | 92 -> 100 | 20.48 s -> 5.63 s | 1323 -> 358 ms | 9994 -> 5144 KB |
| Desktop (median of 2) | 80 -> 97 | 92 -> 100 | 3.57 s -> 1.16 s | 96 -> 78 ms | 9992 -> 6385 KB |

LCP element: main = "SCROLL" hint (appears after all models load); stack = the HTML <h1>.
Shadows kept: window-shadows-on/off.png show the point light visibly shades the window frame.
