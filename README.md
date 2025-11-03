# Steps to reproduce:

1. Install deps via `npm install`
2. Run `npm run dev`
3. Open in Chrome (must be `https://`)
4. Try to reload (important: browser cache must be enabled!)

> In `vite.config.js` plugin parameters can be changed. 
> I could reproduce with 1000 and 500 too, but less often.
> Also, it rarely occurs in incognito mode.
> But Firefox handles it fine (as well as Safari, but Safari falls back to http/1.1)

**Default**: 
```json
{
    "totalFiles": 3000,
    "fileCharacters": 50000
}
```

* **ER**: Normal reload, all modules are loaded
* **AR**: Intermittent `net::ERR_HTTP2_PROTOCOL_ERROR`
