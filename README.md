# Pack-Up Timer

A classroom countdown timer with a cat photo background. Plain HTML/CSS/JS —
no build step, no dependencies.

## Files

```
packup-timer/
├── index.html   # page structure
├── style.css    # all styling
├── timer.js     # countdown logic
└── cat.jpg      # background photo
```

## Running it locally

No build step needed — but opening `index.html` straight from the file
manager (`file://`) works in most browsers. If you'd rather serve it
properly (recommended, avoids occasional browser quirks with local files):

```bash
cd packup-timer
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

If you have Node installed, `npx serve` works the same way:

```bash
npx serve .
```

## Editing

- **Change the default time**: edit `let totalSeconds = 5 * 60;` at the top
  of `timer.js`.
- **Change the photo**: replace `cat.jpg` with any image of the same name,
  or update the `src="cat.jpg"` in `index.html`.
- **Add a new preset button**: add a `<button data-min="3">3m</button>` in
  `index.html`'s `.presets` div — `timer.js` picks it up automatically.
- **Colors/fonts**: all in `style.css`, under `:root` for the main accent
  colors.

## Deploying for free

### GitHub Pages
```bash
cd packup-timer
git init
git add .
git commit -m "pack-up timer"
gh repo create packup-timer --public --source=. --push
```
Then in the repo on github.com: **Settings → Pages → Deploy from branch**
(`main`, root). You'll get a URL like
`https://leannejdong.github.io/packup-timer/` within a minute or two.

### Cloudflare Pages
Go to pages.cloudflare.com → "Upload assets" → drag in the whole
`packup-timer` folder. There will be a `*.pages.dev` URL immediately, and we
can map it to a subdomain (e.g. `timer.spacetimeit.com`) afterward.

### NAS / Cloudflare Tunnel
Copy the `packup-timer` folder into whatever directory the tunnel already
serves for spacetimeit.com (e.g. as a `/timer` subpath), no extra config
needed since it's just static files.

## Controls

- **Space** — start/pause
- **r** — reset
- Preset buttons (1m/2m/5m/10m) — change the countdown length
- Fullscreen button (top right) — good for projecting
