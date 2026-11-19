# Vista Women's Health

Website for Vista Women's Health, an OB/GYN and minimally invasive gynecologic surgery practice in Montclair, NJ.

## Structure

```
index.html      Homepage (static HTML + inline CSS, no build step)
img/            Photography referenced by the pages
```

## Local preview

No build tools are required. Serve the folder with any static server:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Branches

- `main` — production-ready code
- `develop` — integration branch; open feature branches off `develop` and merge back via pull request
