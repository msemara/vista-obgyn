# Vista Women's Health

Website for Vista Women's Health, an OB/GYN and minimally invasive gynecologic surgery practice in Montclair, NJ.

## Structure

```
index.html                 Homepage
endometriosis/index.html   Endometriosis condition page (served at /endometriosis/)
fibroids/index.html        Uterine fibroids condition page (served at /fibroids/)
css/site.css               Shared styles for every page
img/                       Photography referenced by the pages
```

## Local preview

No build tools are required. Pages use root-relative paths (`/css/site.css`, `/img/...`), so serve the folder rather than opening files directly:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Branches

- `main` — production-ready code
- `develop` — integration branch; open feature branches off `develop` and merge back via pull request
