/* ==========================================================================
   Scroll-driven hero — a frame sequence painted to a <canvas>.
   --------------------------------------------------------------------------
   Markup contract (see projects.html):

     <section class="scroll-hero" id="scroll-hero">
       <div class="sh-sticky">
         <canvas class="sh-canvas"></canvas>
         <div class="sh-stage">
           <div class="sh-step" data-from="1" data-to="25"> … </div>
           …one .sh-step per text beat, ranges given in FRAME numbers…
         </div>
       </div>
     </section>

   Call:  initScrollHero({ frameCount: 120 })

   The page gets taller (one viewport per beat) and the frame shown is tied
   to how far you have scrolled through that tall section, so scrolling
   "plays" the video. Text beats cross-fade over their frame ranges.
   ========================================================================== */

window.initScrollHero = function initScrollHero(options) {
  var opt = Object.assign(
    {
      root: "#scroll-hero",
      frameCount: 120,
      // Where the still frames live. Frame numbers are 1-based.
      frameSrc: function (n) {
        return "assets/img/hero-frames/frame_" + String(n).padStart(3, "0") + ".jpg";
      },
      // Optional: scrub this video instead of loading still frames.
      videoSrc: "",
      fps: 12,
      // How much page scroll each text beat gets, in viewport heights.
      vhPerStep: 100,
      // Cross-fade length, in frames.
      fade: 5,
      // How many frame images to fetch at once.
      concurrency: 6
    },
    options || {}
  );

  var root = document.querySelector(opt.root);
  if (!root) return;

  var canvas = root.querySelector(".sh-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d", { alpha: false });
  var rail = root.querySelector(".sh-rail i");
  var cue = root.querySelector(".sh-cue");
  var loader = root.querySelector(".sh-loader");

  var steps = Array.prototype.map.call(root.querySelectorAll(".sh-step"), function (el) {
    return { el: el, from: +el.dataset.from, to: +el.dataset.to, o: -1 };
  });

  var N = opt.frameCount;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- reduced motion: show every beat as plain stacked text ---------- */
  if (reduced) {
    steps.forEach(function (s) { s.el.style.opacity = 1; });
    root.classList.add("is-ready");
    return;
  }

  /* ---------- page height: one viewport per beat, plus a tail ---------- */
  var beats = Math.max(steps.length + 1, 2);
  root.style.setProperty("--sh-height", beats * opt.vhPerStep + "vh");

  /* ---------- canvas sizing ---------- */
  var srcW = 1280, srcH = 720;

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    paint(current, true);
  }

  // Draw like CSS `object-fit: cover`.
  function drawCover(src, sw, sh) {
    var cw = canvas.width, ch = canvas.height;
    ctx.fillStyle = "#070b16";
    ctx.fillRect(0, 0, cw, ch);
    if (!sw || !sh) return;
    var s = Math.max(cw / sw, ch / sh);
    var w = sw * s, h = sh * s;
    ctx.drawImage(src, (cw - w) / 2, (ch - h) / 2, w, h);
  }

  /* ---------- source: still frames, or a scrubbed video ---------- */
  var current = 1, painted = -1, allLoaded = false, source;

  function frameSource() {
    var imgs = new Array(N + 1);
    var loaded = 0, next = 1, inflight = 0, ready = false;

    function pump() {
      while (next <= N && inflight < opt.concurrency) load(next++);
    }

    function load(n) {
      inflight++;
      var im = new Image();
      im.decoding = "async";
      im.onload = im.onerror = function () {
        inflight--;
        loaded++;
        imgs[n] = im.naturalWidth ? im : null;
        if (n === 1 && im.naturalWidth) { srcW = im.naturalWidth; srcH = im.naturalHeight; }
        progress(loaded / N);
        if (!ready && loaded >= Math.min(16, N)) { ready = true; markReady(); }
        if (loaded === N) { allLoaded = true; markReady(); }
        painted = -1; // a better frame may now be available
        pump();
      };
      im.src = opt.frameSrc(n);
      imgs[n] = im;
    }
    pump();

    return {
      draw: function (n) {
        // Fall back to the nearest already-decoded frame while loading.
        for (var i = n; i >= 1; i--) {
          var im = imgs[i];
          if (im && im.complete && im.naturalWidth) {
            drawCover(im, im.naturalWidth, im.naturalHeight);
            return true;
          }
        }
        return false;
      }
    };
  }

  function videoSource(src) {
    var v = document.createElement("video");
    v.src = src;
    v.muted = true;
    v.playsInline = true;
    v.preload = "auto";
    var seeking = false, want = null, ok = false;

    v.addEventListener("loadeddata", function () {
      srcW = v.videoWidth; srcH = v.videoHeight;
      ok = true; allLoaded = true;
      progress(1);
      markReady();
      painted = -1;
    });
    v.addEventListener("seeked", function () {
      seeking = false;
      drawCover(v, v.videoWidth, v.videoHeight);
      if (want !== null) { var t = want; want = null; go(t); }
    });
    v.addEventListener("progress", function () {
      if (v.buffered.length && v.duration) {
        progress(v.buffered.end(v.buffered.length - 1) / v.duration);
      }
    });

    function go(t) {
      if (seeking) { want = t; return; }
      seeking = true;
      v.currentTime = t;
    }

    return {
      draw: function (n) {
        if (!ok) return false;
        go(Math.min((n - 1) / opt.fps, (v.duration || 20) - 0.03));
        return true;
      }
    };
  }

  source = opt.videoSrc ? videoSource(opt.videoSrc) : frameSource();

  function progress(p) {
    if (loader) loader.style.setProperty("--sh-load", Math.round(Math.min(p, 1) * 100) + "%");
  }
  function markReady() { root.classList.add("is-ready"); }

  function paint(n, force) {
    if (n === painted && !force) return;
    if (source.draw(n)) painted = n;
  }

  /* ---------- scroll ---------- */
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }

  function update(forceP) {
    var p;
    if (typeof forceP === "number") {
      p = clamp01(forceP);
    } else {
      var rect = root.getBoundingClientRect();
      var span = root.offsetHeight - window.innerHeight;
      p = span > 0 ? clamp01(-rect.top / span) : 0;
    }

    var f = 1 + p * (N - 1);
    current = Math.round(f);
    paint(current);

    for (var i = 0; i < steps.length; i++) {
      var s = steps[i];
      var fin = (f - s.from + opt.fade) / opt.fade;
      var fout = (s.to + opt.fade - f) / opt.fade;
      var o = clamp01(Math.min(fin, fout));
      if (Math.abs(o - s.o) > 0.004) {
        s.o = o;
        s.el.style.opacity = o;
        s.el.style.transform = "translateY(" + ((1 - o) * 22).toFixed(1) + "px)";
      }
    }

    if (rail) rail.style.height = (p * 100).toFixed(2) + "%";
    if (cue) cue.style.opacity = p > 0.02 ? 0 : 1;
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; update(); });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { resize(); update(); });
  resize();
  update();

  // Keep repainting while frames stream in, then stop once they're all decoded.
  var warm = setInterval(function () {
    paint(current, true);
    if (allLoaded) clearInterval(warm);
  }, 400);
  setTimeout(function () { clearInterval(warm); }, 30000);

  // Debug helper: jump to a frame without scrolling — window.__scrollHero.goToFrame(60)
  window.__scrollHero = {
    goToFrame: function (n) { update((n - 1) / (N - 1)); }
  };
};
