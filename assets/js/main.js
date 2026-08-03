/* ==========================================================================
   main.js — renders content from data.js and powers all interactions.
   You normally DON'T need to edit this file; edit data.js instead.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- tiny helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (html) => {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  const initials = (str) => {
    const w = String(str).replace(/[^A-Za-z0-9 ]/g, " ").trim().split(/\s+/).filter(Boolean);
    return ((w[0]?.[0] || "") + (w[1]?.[0] || w[0]?.[1] || "")).toUpperCase();
  };

  /* ---------- inline SVG icons ---------- */
  const ICON = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.57.1.78-.25.78-.55v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.3-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.75.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.11-2.12C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.39.53A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.11 2.12c1.89.53 9.39.53 9.39.53s7.5 0 9.39-.53a3 3 0 0 0 2.11-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.57V8.43L15.82 12 9.6 15.57Z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.5h3.68l-8.05 9.2L24 22.5h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.5h7.6l5.24 6.93L18.9 1.5Zm-1.3 18.8h2.04L6.48 3.6H4.3l13.3 16.7Z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12A12 12 0 1 0 10.13 23.85v-8.38H7.08V12h3.05V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95H15.8c-1.49 0-1.95.92-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15h6M9 11h2"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  };

  const socialIcon = (k) => ICON[k] || ICON.ext;

  /* ---------- Skill logo (bundled locally in assets/img/skills) ---------- */
  const skillIcon = (slug) => `assets/img/skills/${slug}.svg`;

  window.__skillFallback = function (img) {
    // If a logo is ever missing, show a tidy letter badge instead of a broken image.
    img.parentElement.innerHTML = `<span class="badge">${esc(img.dataset.letter)}</span>`;
  };
  window.__mediaFallback = function (img) { img.remove(); };

  /* =======================================================================
     RENDERERS
     ======================================================================= */

  function renderHero() {
    const box = $("#hero-content");
    if (!box) return;
    const s = SITE;
    const socials = Object.entries(s.socials || {})
      .filter(([, v]) => v)
      .map(([k, v]) => `<a class="social-btn" href="${esc(v)}" target="_blank" rel="noopener" aria-label="${k}">${socialIcon(k)}</a>`)
      .join("");
    const resumeBtn = s.resume
      ? `<a class="btn btn-ghost" href="${esc(s.resume)}" target="_blank" rel="noopener">${ICON.download}Résumé</a>`
      : "";
    box.innerHTML = `
      <div class="hero-badge reveal"><span class="dot"></span> Available for research & internship opportunities</div>
      <h1 class="reveal d1">Hi, I'm <span class="grad">${esc(s.name)}</span></h1>
      <div class="hero-role reveal d2"><span class="type" id="typed"></span><span class="cursor"></span></div>
      <p class="hero-tagline reveal d3">${esc(s.tagline)}</p>
      <div class="hero-actions reveal d3">
        <a class="btn btn-primary" href="#projects">View my work ${ICON.code}</a>
        <a class="btn btn-ghost" href="#contact">Get in touch</a>
        ${resumeBtn}
      </div>
      <div class="hero-socials reveal d4">${socials}</div>`;
  }

  function renderHeroPolaroid() {
    const box = $("#polaroid-caption");
    if (!box) return;
    const factByLabel = (label) => ABOUT.facts.find((f) => f.label === label);
    const rows = [factByLabel("Currently"), factByLabel("Education")].filter(Boolean);
    box.innerHTML = rows
      .map(
        (f, i) => `<div class="cap-row${i > 0 ? " sub" : ""}"><span class="ic">${f.icon}</span> ${esc(f.value)}</div>`
      )
      .join("");
  }

  function renderAbout() {
    const p = $("#about-text");
    if (p) p.innerHTML = ABOUT.paragraphs.map((t) => `<p class="reveal">${esc(t)}</p>`).join("");
    const f = $("#about-facts");
    if (f)
      f.innerHTML = ABOUT.facts
        .map(
          (x, i) => `<div class="fact reveal d${(i % 4) + 1}">
            <div class="ic">${x.icon}</div>
            <div class="lbl">${esc(x.label)}</div>
            <div class="val">${esc(x.value)}</div>
          </div>`
        )
        .join("");
  }

  function renderExperience() {
    const box = $("#timeline");
    if (!box) return;
    box.innerHTML = EXPERIENCE.map(
      (e) => `<div class="tl-item reveal">
        <div class="tl-period">${esc(e.period)}</div>
        <div class="tl-role">${esc(e.role)}</div>
        <div class="tl-org">${esc(e.org)}</div>
        <p class="tl-desc">${esc(e.description)}</p>
      </div>`
    ).join("");
  }

  function renderExperienceStats() {
    const box = $("#exp-stats");
    if (!box) return;
    box.innerHTML = EXPERIENCE_STATS.map(
      (s, i) => `<div class="stat-card reveal d${(i % 4) + 1}">
        <div class="stat-num" data-target="${s.value}" data-suffix="${esc(s.suffix || "")}">0${esc(s.suffix || "")}</div>
        <div class="stat-label">${esc(s.label)}</div>
        <div class="stat-sub">${esc(s.sub)}</div>
      </div>`
    ).join("");
  }

  function renderSkills() {
    const box = $("#skills-groups");
    if (!box) return;
    box.innerHTML = SKILL_GROUPS.map(
      (g) => `<div class="skill-group reveal">
        <h3>${esc(g.title)}</h3>
        <div class="skill-grid">
          ${g.skills
            .map(
              (sk) => `<div class="skill">
                <span class="skill-ic"><img loading="lazy" alt="${esc(sk.name)}"
                  src="${skillIcon(sk.icon)}"
                  data-letter="${esc(initials(sk.name))}"
                  onerror="__skillFallback(this)"></span>
                <span>${esc(sk.name)}</span>
              </div>`
            )
            .join("")}
        </div>
      </div>`
    ).join("");
  }

  function projectLinks(p) {
    let out = "";
    if (p.repo)
      out += `<a class="primary" href="${esc(p.repo)}" target="_blank" rel="noopener">${ICON.github} Code</a>`;
    if (p.demo)
      out += `<a href="${esc(p.demo)}" target="_blank" rel="noopener">${ICON.ext} ${p.demoLabel || "View"}</a>`;
    return out;
  }

  function projectCard(p) {
    const img = p.image
      ? `<img loading="lazy" alt="${esc(p.title)}" src="${esc(p.image)}" onerror="__mediaFallback(this)">`
      : "";
    return `<article class="pcard reveal" data-cat="${esc(p.category)}">
      <div class="pcard-media">
        <div class="ph"><div class="pcard-ph-bg"></div><span class="pcard-ph-mono">${esc(initials(p.title))}</span></div>
        <span class="pcard-cat">${esc(p.category)}</span>
        ${img}
      </div>
      <div class="pcard-body">
        <div class="pcard-meta"><span class="org">${esc(p.org || "")}</span><span>•</span><span>${esc(p.period || "")}</span></div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
        <div class="pcard-tags">${(p.tech || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        <div class="pcard-links">${projectLinks(p)}</div>
      </div>
    </article>`;
  }

  // Category display order used on the full Projects page.
  const PROJECT_CAT_ORDER = ["Machine Learning", "Web", "Python"];
  const catSlug = (cat) => cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Label + neon icon shown on the Projects page category stat cards.
  const PROJECT_CAT_META = {
    "Machine Learning": {
      label: "Machine Learning Projects",
      sub: "Research pipelines & model calibration",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 7V4M15 7V4M9 20v-3M15 20v-3M7 9H4M7 15H4M20 9h-3M20 15h-3"/><circle cx="12" cy="12" r="2"/></svg>',
    },
    Web: {
      label: "Web Development Projects",
      sub: "Full-stack web applications",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9S9.5 5.7 12 3Z"/></svg>',
    },
    Python: {
      label: "Python Projects",
      sub: "Clean, focused Python tools",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="m7 9 4 3-4 3"/><path d="M13 15h4"/></svg>',
    },
  };

  function orderedCategories() {
    const present = new Set(PROJECTS.map((p) => p.category));
    return PROJECT_CAT_ORDER.filter((c) => present.has(c)).concat(
      [...present].filter((c) => !PROJECT_CAT_ORDER.includes(c))
    );
  }

  function renderFeaturedProjects() {
    const grid = $("#projects-grid");
    if (!grid) return;
    grid.innerHTML = PROJECTS.filter((p) => p.featured).map(projectCard).join("");
  }

  function renderProjectStats() {
    const box = $("#project-stats");
    if (!box) return;
    box.innerHTML = orderedCategories()
      .map((cat, i) => {
        const count = PROJECTS.filter((p) => p.category === cat).length;
        const meta = PROJECT_CAT_META[cat] || { label: cat + " Projects", sub: "", icon: "" };
        return `<a class="stat-card reveal d${(i % 4) + 1}" href="#cat-${catSlug(cat)}">
          <span class="stat-icon">${meta.icon}</span>
          <div class="stat-num" data-target="${count}" data-suffix="">0</div>
          <div class="stat-label">${esc(meta.label)}</div>
          <div class="stat-sub">${esc(meta.sub)}</div>
        </a>`;
      })
      .join("");
  }

  function renderAllProjects() {
    const box = $("#all-projects");
    if (!box) return;
    const cats = orderedCategories();
    box.innerHTML = cats
      .map((cat) => {
        const items = PROJECTS.filter((p) => p.category === cat);
        return `<div class="project-category" id="cat-${catSlug(cat)}">
          <h3 class="cat-title reveal">${esc(cat)}</h3>
          <div class="projects-grid">${items.map(projectCard).join("")}</div>
        </div>`;
      })
      .join("");
  }

  function renderCertifications() {
    const grid = $("#cert-grid");
    if (!grid) return;
    grid.innerHTML = CERTIFICATIONS.map((c) => {
      const img = c.image
        ? `<img loading="lazy" alt="${esc(c.title)}" src="${esc(c.image)}" onerror="__mediaFallback(this)">`
        : "";
      const cred = c.credentialUrl
        ? `<a class="btn btn-ghost btn-sm" href="${esc(c.credentialUrl)}" target="_blank" rel="noopener">${ICON.ext} Show credential</a>`
        : `<span></span>`;
      const cid = c.credentialId ? `<span class="cred-id">ID <b>${esc(c.credentialId)}</b></span>` : "";
      return `<article class="ccard reveal">
        <div class="ccard-media">
          <div class="ph"><span class="ccard-ph-badge">${esc(initials(c.issuer))}</span></div>
          ${img}
        </div>
        <div class="ccard-body">
          <div class="ccard-issuer">
            <span class="logo">${esc(initials(c.issuer))}</span>
            <span class="who"><b>${esc(c.issuer)}</b><small>${esc(c.date)}</small></span>
          </div>
          <h3>${esc(c.title)}</h3>
          <div class="ccard-skills">${(c.skills || []).slice(0, 5).map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
          <div class="ccard-foot">${cid}${cred}</div>
        </div>
      </article>`;
    }).join("");
  }

  function renderContact() {
    const box = $("#contact-list");
    if (box) {
      const rows = [];
      if (SITE.email)
        rows.push(`<a class="contact-row" href="mailto:${esc(SITE.email)}"><span class="ic">${ICON.mail}</span><span><span class="lbl">Email</span><span class="val">${esc(SITE.email)}</span></span></a>`);
      if (SITE.phone)
        rows.push(`<a class="contact-row" href="tel:${esc(SITE.phone)}"><span class="ic">${ICON.phone}</span><span><span class="lbl">Phone</span><span class="val">${esc(SITE.phone)}</span></span></a>`);
      rows.push(`<div class="contact-row"><span class="ic">${ICON.pin}</span><span><span class="lbl">Location</span><span class="val">${esc(SITE.location)}</span></span></div>`);
      if (SITE.socials.linkedin)
        rows.push(`<a class="contact-row" href="${esc(SITE.socials.linkedin)}" target="_blank" rel="noopener"><span class="ic">${ICON.linkedin}</span><span><span class="lbl">LinkedIn</span><span class="val">in/shafin-ahmed101</span></span></a>`);
      if (SITE.socials.github)
        rows.push(`<a class="contact-row" href="${esc(SITE.socials.github)}" target="_blank" rel="noopener"><span class="ic">${ICON.github}</span><span><span class="lbl">GitHub</span><span class="val">@anothershafin</span></span></a>`);
      box.innerHTML = rows.join("");
    }
    const cta = $("#contact-cta-btn");
    if (cta && SITE.email) cta.href = "mailto:" + SITE.email;
  }

  function renderFooter() {
    const s = $("#footer-socials");
    if (s)
      s.innerHTML = Object.entries(SITE.socials || {})
        .filter(([, v]) => v)
        .map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener" aria-label="${k}">${socialIcon(k)}</a>`)
        .join("");
    $$(".year").forEach((y) => (y.textContent = new Date().getFullYear()));
    $$(".site-name").forEach((n) => (n.textContent = SITE.name));
  }

  /* =======================================================================
     INTERACTIONS
     ======================================================================= */

  function typewriter() {
    const t = $("#typed");
    if (!t || !SITE.roles?.length) return;
    let i = 0, j = 0, del = false;
    (function tick() {
      const word = SITE.roles[i];
      t.textContent = word.slice(0, j);
      if (!del && j < word.length) { j++; setTimeout(tick, 70); }
      else if (!del && j === word.length) { del = true; setTimeout(tick, 1500); }
      else if (del && j > 0) { j--; setTimeout(tick, 35); }
      else { del = false; i = (i + 1) % SITE.roles.length; setTimeout(tick, 300); }
    })();
  }

  function nav() {
    const bar = $("#nav");
    const toggle = $("#nav-toggle");
    const links = $("#nav-links");
    const onScroll = () => {
      bar?.classList.toggle("scrolled", window.scrollY > 24);
      const prog = $("#progress");
      if (prog) {
        const h = document.documentElement;
        prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
      }
      const top = $("#to-top");
      top?.classList.toggle("show", window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toggle?.addEventListener("click", () => {
      toggle.classList.toggle("open");
      links.classList.toggle("open");
    });
    $$("#nav-links a").forEach((a) =>
      a.addEventListener("click", () => {
        toggle?.classList.remove("open");
        links?.classList.remove("open");
      })
    );
    $("#to-top")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function scrollSpy() {
    const links = $$('#nav-links a[href^="#"]');
    if (!links.length) return;
    const map = new Map();
    links.forEach((a) => {
      const id = a.getAttribute("href").slice(1);
      const sec = document.getElementById(id);
      if (sec) map.set(sec, a);
    });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            links.forEach((l) => l.classList.remove("active"));
            map.get(en.target)?.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    map.forEach((_, sec) => obs.observe(sec));
  }

  function reveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) { items.forEach((i) => i.classList.add("in")); return; }
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("in"); o.unobserve(en.target); }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((i) => obs.observe(i));
  }

  function countUpStats() {
    const nums = $$(".stat-num[data-target]");
    if (!nums.length) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = (el) => { el.textContent = el.dataset.target + el.dataset.suffix; };
    const animate = (el) => {
      if (reduceMotion || !("requestAnimationFrame" in window)) { finish(el); return; }
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || "";
      const duration = 1400;
      const start = performance.now();
      const ease = (t) => 1 - Math.pow(1 - t, 3); // ease-out cubic
      (function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * ease(p)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else finish(el);
      })(start);
    };
    if (!("IntersectionObserver" in window)) { nums.forEach(animate); return; }
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { animate(en.target); o.unobserve(en.target); }
        });
      },
      { threshold: 0.4 }
    );
    nums.forEach((n) => obs.observe(n));
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderHero();
    renderHeroPolaroid();
    renderAbout();
    renderExperience();
    renderExperienceStats();
    renderSkills();
    renderFeaturedProjects();
    renderProjectStats();
    renderAllProjects();
    renderCertifications();
    renderContact();
    renderFooter();
    typewriter();
    nav();
    scrollSpy();
    // reveal after content is injected
    requestAnimationFrame(reveal);
    requestAnimationFrame(countUpStats);
  });
})();
