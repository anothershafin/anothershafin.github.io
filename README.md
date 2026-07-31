# Shafin Ahmed — Portfolio

A fast, editable, single-page portfolio + a separate **Licenses & Certifications** page.
No build tools, no frameworks — just HTML, CSS and vanilla JavaScript, so it runs anywhere
and deploys to **GitHub Pages** with zero configuration.

---

## ✏️ How to edit your content

**Almost everything lives in one file:** [`assets/js/data.js`](assets/js/data.js).

Open it and you'll find clearly-labelled sections:

| Section          | What it controls                                        |
|------------------|---------------------------------------------------------|
| `SITE`           | Your name, rotating job titles, email, social links     |
| `ABOUT`          | The "About me" paragraphs and the four highlight cards  |
| `EXPERIENCE`     | The experience timeline                                 |
| `SKILL_GROUPS`   | Your skills, grouped, each with a logo                  |
| `PROJECTS`       | Every project card                                      |
| `CERTIFICATIONS` | Every certificate on the Certifications page            |

Change the text, save, and refresh the page — that's it.

### Add a new project
Copy an existing block inside `PROJECTS` and edit it:

```js
{
  title: "My New Project",
  org: "BRAC University",
  period: "Jan 2026",
  category: "Web",              // "Machine Learning" | "Web" | "Python" (drives the filter)
  featured: false,             // true = shown first
  description: "What it does…",
  tech: ["Python", "Django"],
  image: "assets/img/projects/my-new-project.jpg",   // see below
  repo: "https://github.com/anothershafin/your-repo",
  demo: "",                     // optional live/report link ("" hides the button)
},
```

### Add a new certificate
Copy a block inside `CERTIFICATIONS`:

```js
{
  title: "Course Name",
  issuer: "Google",
  date: "Issued Feb 2026",
  skills: ["Python", "Data Analysis"],
  image: "assets/img/certs/my-cert.jpg",
  credentialUrl: "https://coursera.org/verify/XXXX",  // "" hides the button
  credentialId: "",                                   // optional
},
```

---

## 🖼️ Adding images

You said you'll upload images later — the layout already **reserves a spot** for each one and
shows a neat placeholder until the file exists, so nothing ever looks broken.

1. Drop your image into:
   - **Projects** → `assets/img/projects/`
   - **Certificates** → `assets/img/certs/`
2. Make sure the `image:` path in `data.js` matches the file name.

The filenames the site currently expects are listed in
`assets/img/projects/_expected-files.txt` and `assets/img/certs/_expected-files.txt`.
Use those names and the images appear automatically — no code changes needed.

**Tips:** project images look best at **16:9** (e.g. 1280×720); certificate images at **4:3**.
JPG or PNG both work.

### Swapping the profile photo or logo
- Hero photo (the polaroid) → replace `assets/img/DP_wbg_2.png`. Use a **transparent PNG**
  cut out around your upper body — the polaroid window crops it into a square and lets your
  head/shoulders pop up out of the frame, so a background-removed photo looks best.
- Logo / favicon → replace `assets/img/logo.png` (and `favicon-32.png`, `apple-touch-icon.png`)

The polaroid's caption text ("ML Engineer Intern @ ...", "B.Sc. in CSE — ...") isn't hardcoded —
it's pulled automatically from the **"Currently"** and **"Education"** entries in `ABOUT.facts`
inside `data.js`. Edit those two facts and the polaroid updates too.

---

## 🎨 Changing colours

Open [`assets/css/styles.css`](assets/css/styles.css) and edit the variables at the very top
(`:root { … }`) — e.g. `--accent`, `--bg`. Everything updates from there.

---

## 🚀 Deploy to GitHub Pages

1. Create a repository (a good name is `anothershafin.github.io` for a root URL, or any name).
2. Push these files to it:
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/anothershafin/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pick **`main`** and **`/ (root)`**, then **Save**.
4. Wait ~1 minute. Your site is live at:
   - `https://anothershafin.github.io/` (if the repo is `anothershafin.github.io`), or
   - `https://anothershafin.github.io/<repo-name>/` otherwise.

The included `.nojekyll` file tells GitHub Pages to serve everything as-is.

### Preview locally
Just open `index.html` in a browser — or run a tiny server for cleaner routing:
```bash
python -m http.server 8080
# then visit http://localhost:8080
```

---

## 📁 Project structure
```
Portfolio Site/
├── index.html              # Home (hero, about, experience, skills, projects, contact)
├── certifications.html     # Licenses & Certifications page
├── README.md
├── .nojekyll
└── assets/
    ├── css/styles.css      # All styling (colours at the top)
    ├── js/data.js          # ← YOUR CONTENT lives here
    ├── js/main.js          # Rendering + interactions (rarely needs editing)
    └── img/
        ├── DP_wbg_2.png    # Hero photo (transparent cutout, in the polaroid)
        ├── logo.png        # Logo / favicon source
        ├── projects/       # Project screenshots
        └── certs/          # Certificate images
```

Skill logos are bundled locally in `assets/img/skills/` (from [Devicon](https://devicon.dev)),
so the site is fully self-contained and works even offline. To add a new one, download its SVG
from Devicon into that folder and set the skill's `icon` to the file name (without `.svg`).
