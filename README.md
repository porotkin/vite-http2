# Steps to reproduce:

1. Install deps via `npm install`
2. Run `npm run dev`
3. Open in Chrome (must be `https://`)
4. Try to reload (important: browser cache must be enabled!)

ER: Normal reload, all modules are loaded
AR: Intermittent `net::ERR_HTTP2_PROTOCOL_ERROR`
