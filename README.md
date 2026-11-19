# Vista Women's Health

Website for Vista Women's Health, an OB/GYN and minimally invasive gynecologic surgery practice in Montclair, NJ.

## Structure

```
index.html                 Homepage
endometriosis/index.html   Endometriosis condition page (served at /endometriosis/)
fibroids/index.html        Uterine fibroids condition page (served at /fibroids/)
pelvic-pain/index.html     Pelvic pain condition page (served at /pelvic-pain/)
our-gynecology-services/index.html
                           Gynecology services page (served at /our-gynecology-services/)
our-maternity-services/index.html
                           Maternity services page (served at /our-maternity-services/)
pcos/, infertility/, heavy-periods/, abnormal-pap-smear/,
menopause/, hormone-therapy/, vaginal-infections/
                           "Full page coming soon" placeholders (noindex). Replace
                           each index.html with the full page when it is ready and
                           remove the robots noindex tag.
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
