# Background video: measured playback (headless Chrome, cache off)

| File | Network | Starts playing | Downloaded |
|---|---|---|---|
| Current WebM (live sebastian.wiki) | Slow 4G (1.6 Mb/s, 150 ms) | 21.5 s | 6.58 MB |
| AV1 720p MP4 | Slow 4G | 1.0 s | 1.79 MB |
| H.264 720p MP4 | Slow 4G | 0.8 s | 2.21 MB |
| AV1 1080p MP4 | Cable (40 Mb/s, 20 ms) | 0.13 s | 3.06 MB |

Phone end to end (fast 4G, 4x CPU, 390x844), main -> stack top:
- page weight 8.97 MB -> 4.78 MB; video chosen: stitched6.<hash>.h264-720.mp4
- poster painted by 0.38 s; video request starts after the 3D models
- with every .glb request blocked: main shows "This page couldn't load"; the stack keeps the title and plays the video
- interrupted encode leaves only a *.partial-<pid>.mp4; the rerun completes it and all 4 renditions decode cleanly (ffmpeg -f null)
