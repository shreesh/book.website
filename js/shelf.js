(function () {
  var BOOKS = [
    { href: "books/why-hinduism-english.html", cover: "images/covers/idf694.jpg", short: "Why?", hi: "", title: "Why? Hinduism Defined Scientifically and Rationally", author: "Pt. Madhavacharya Shastri", meta: "English · 542 pages", foot: "EN", cloth: "#2e2628", ink: "#f4eadc" },
    { href: "books/why-purvardha.html", cover: "images/covers/haa039.jpg", short: "क्यों?", hi: "क्यों?", title: "Why? (Purvardha)", author: "Pt. Madhavacharya Shastri", meta: "Hindi · 562 pages", foot: "हिं", cloth: "#4b1e0e", ink: "#f4eadc" },
    { href: "books/why-hinduism-sanskrit-english.html", cover: "images/covers/hal933.jpg", short: "Why?", hi: "", title: "Why? Hinduism Defined Scientifically and Rationally", author: "Pt. Madhavacharya Shastri", meta: "Sanskrit, transliteration, and English · 578 pages", foot: "सं", cloth: "#1c1f20", ink: "#f4eadc" },
    { href: "books/who-is-hindu.html", cover: "images/covers/nal144.jpg", short: "Who Is Hindu", hi: "", title: "Who is Hindu", author: "Pt. Premacharya Shastri", meta: "Sanskrit, transliteration, and English · 50 pages", foot: "सं", cloth: "#3d7574", ink: "#f7f3ea" },
    { href: "books/sanatan-dharma-questions.html", cover: "images/covers/nzi203.jpg", short: "प्रश्नोत्तरी", hi: "सनातन हिन्दू धर्म प्रश्नोत्तरी", title: "Question Answers on Sanatan Dharma", author: "Pt. Premacharya Shastri", meta: "Hindi · 92 pages", foot: "हिं", cloth: "#2f5c60", ink: "#f4eadc" },
    { href: "books/veda-digdarshan.html", cover: "images/covers/haa634.jpg", short: "वेद दिग्दर्शन", hi: "वेद दिग्दर्शन", title: "A Most Comprehensive Introduction to the Vedas", author: "Pt. Madhava Shastri", meta: "Sanskrit and Hindi · 396 pages", foot: "सं", cloth: "#8a4b3a", ink: "#f8f1e6" },
    { href: "books/purana-digdarshan.html", cover: "images/covers/haa633.jpg", short: "पुराण दिग्दर्शन", hi: "पुराण दिग्दर्शन", title: "The Most Comprehensive Introduction to the Puranas Ever", author: "Pt. Madhava Shastri", meta: "Sanskrit and Hindi · 792 pages", foot: "सं", cloth: "#6e4e28", ink: "#f8f1e6" },
    { href: "books/veda-purana-set.html", cover: "images/covers/bkna864.jpg", short: "वेद एवं पुराण", hi: "वेद एवं पुराण दिग्दर्शन", title: "Veda and Purana Digdarshan", author: "Pt. Madhava Shastri", meta: "Sanskrit and Hindi · 1,188 pages", foot: "सं", cloth: "#7a5538", ink: "#f8f1e6" },
    { href: "books/best-stories-from-vedas.html", cover: "images/covers/nzi218.jpg", short: "कहानियां", hi: "वेदों की श्रेष्ठ कहानियां", title: "Best Stories from the Vedas", author: "Pt. Premacharya Shastri", meta: "Hindi · 112 pages", foot: "हिं", cloth: "#6d332c", ink: "#f8f1e6" },
    { href: "books/different-ramayanas.html", cover: "images/covers/haa613.jpg", short: "विविध रामायण", hi: "विविध रामायण", title: "Different Ramayanas", author: "Pt. Madhavacharya Shastri and Pt. Premacharya Shastri", meta: "Sanskrit and Hindi · 136 pages", foot: "सं", cloth: "#5d2b1d", ink: "#f4eadc" },
    { href: "books/secrets-of-ramayanas.html", cover: "images/covers/idj562.jpg", short: "Secrets", hi: "", title: "The Secrets of Different Ramayanas", author: "Pt. Madhavacharya Shastri", meta: "English · 154 pages", foot: "EN", cloth: "#34313c", ink: "#f4eadc" },
    { href: "books/our-festivals.html", cover: "images/covers/nzi201.jpg", short: "पर्व और त्यौहार", hi: "हमारे पर्व और त्यौहार", title: "Our Feasts and Festivals", author: "Pt. Madhavacharya Shastri", meta: "Hindi · 148 pages", foot: "हिं", cloth: "#8d6824", ink: "#2a1c12" },
    { href: "books/tulsidas.html", cover: "images/covers/nzi202.jpg", short: "तुलसी दास", hi: "तुलसी दास", title: "Tulsidas: The Nayak of Hindu Society", author: "Pt. Premacharya Shastri", meta: "Hindi · 191 pages", foot: "हिं", cloth: "#8d4630", ink: "#f8f1e6" }
  ];

  var scene = document.querySelector(".shelf-scene");
  var stage = document.getElementById("shelf-stage");
  var row = document.getElementById("shelf-row");
  var now = document.getElementById("shelf-now");
  var meta = document.getElementById("shelf-meta");
  var hint = document.getElementById("shelf-hint");
  var openLink = document.getElementById("shelf-open");
  var prev = document.getElementById("shelf-prev");
  var next = document.getElementById("shelf-next");
  if (!scene || !stage || !row || !BOOKS.length) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var n = BOOKS.length;
  var position = 6;
  var target = 6;
  var intro = reduced ? 1 : 0;
  var shown = -1;
  var dragging = false;
  var dragged = false;
  var pointerId = null;
  var dragStartX = 0;
  var dragStartTarget = 0;
  var running = false;
  var metrics = { h: 260, spine: 30, cover: 176, gap: 5 };
  var volumes = [];
  var hindiFit = 0;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function build() {
    BOOKS.forEach(function (book, i) {
      var link = document.createElement("a");
      link.className = "volume-link";
      link.href = book.href;
      var sr = document.createElement("span");
      sr.className = "sr-only";
      sr.textContent = (book.hi ? book.hi + ". " : "") + book.title + ". " + book.author;
      var body = document.createElement("span");
      body.className = "volume-body";
      body.setAttribute("aria-hidden", "true");
      var spine = document.createElement("span");
      spine.className = "spine";
      var bandTop = document.createElement("span");
      bandTop.className = "spine-band";
      var title = document.createElement("span");
      title.className = "spine-title";
      if (book.hi) {
        title.lang = "hi";
        var turn = document.createElement("span");
        turn.className = "spine-text";
        turn.textContent = book.short;
        title.append(turn);
      } else {
        title.textContent = book.short;
      }
      var foot = document.createElement("span");
      foot.className = "spine-foot";
      foot.textContent = book.foot;
      var bandBottom = document.createElement("span");
      bandBottom.className = "spine-band";
      spine.append(bandTop, title, foot, bandBottom);
      var front = document.createElement("span");
      front.className = "front-wrap";
      var img = document.createElement("img");
      img.src = book.cover;
      img.alt = "";
      img.draggable = false;
      front.append(img);
      body.append(spine, front);
      link.append(sr, body);
      var volume = document.createElement("div");
      volume.className = "volume";
      volume.style.setProperty("--cloth", book.cloth);
      volume.style.setProperty("--ink", book.ink);
      volume.style.setProperty("--open", "0");
      volume.append(link);
      row.append(volume);
      volumes.push(volume);
      link.addEventListener("click", function (event) {
        if (dragged) {
          event.preventDefault();
          dragged = false;
          return;
        }
        if (Math.abs(position - i) > 0.45) {
          event.preventDefault();
          target = i;
          wake();
        }
      });
    });
    stage.classList.add("is-ready");
  }

  function measure() {
    var copy = scene.querySelector(".shelf-copy");
    var controls = scene.querySelector(".shelf-controls");
    var styles = getComputedStyle(scene);
    var padTop = parseFloat(styles.paddingTop) || 0;
    var padBottom = parseFloat(styles.paddingBottom) || 0;
    var copyH = copy ? copy.offsetHeight : 160;
    var controlsH = controls ? controls.offsetHeight : 48;
    var narrow = window.innerWidth < 720;
    var sceneH = scene.clientHeight || window.innerHeight;
    var booksTop = padTop + copyH;
    // Room above the books so the open cover, which scales and lifts, cannot cover the description.
    var rise = narrow ? 36 : 40;
    var footGap = narrow ? 14 : 24;
    var available = sceneH - padBottom - controlsH - booksTop - footGap;
    var h = Math.round(clamp(available - rise, narrow ? 140 : 180, narrow ? 300 : 280));
    if (h + rise > available) h = Math.max(120, Math.round(available - rise));
    metrics.h = h;
    metrics.spine = Math.round(clamp(h * 0.22, narrow ? 44 : 56, narrow ? 54 : 66));
    metrics.cover = Math.round(h * 0.66);
    metrics.gap = narrow ? 16 : 36;
    stage.style.setProperty("--book-h", h + "px");
    stage.style.setProperty("--spine", metrics.spine + "px");
    stage.style.setProperty("--cover", metrics.cover + "px");
    stage.style.height = Math.max(h + rise, 80) + "px";
    row.style.gap = metrics.gap + "px";
  }

  function coverness(i) {
    var t = Math.max(0, 1 - Math.abs(position - i));
    return t * t * (3 - 2 * t);
  }

  function show(i) {
    var book = BOOKS[i];
    var name = document.createElement("span");
    name.className = "shelf-name";
    if (book.hi) {
      name.lang = "hi";
      name.textContent = book.hi;
    } else {
      name.textContent = book.short;
    }
    var by = document.createElement("span");
    by.className = "shelf-by";
    by.textContent = book.author;
    var left = document.createElement("span");
    left.className = "shelf-rule";
    var right = document.createElement("span");
    right.className = "shelf-rule";
    now.replaceChildren(left, name, by, right);
    meta.textContent = book.title + " · " + book.meta;
    openLink.href = book.href;
    hint.textContent = (i + 1) + " of " + n + " · drag or scroll";
    volumes.forEach(function (volume, j) {
      volume.querySelector("a").setAttribute("aria-current", j === i ? "true" : "false");
    });
    prev.disabled = i === 0;
    next.disabled = i === n - 1;
  }

  function fitHindi() {
    var sample = row.querySelector(".spine-title[lang='hi']");
    if (!sample) return;
    var room = sample.clientHeight;
    if (!room || room === hindiFit) return;
    hindiFit = room;
    var titles = row.querySelectorAll(".spine-title[lang='hi']");
    for (var i = 0; i < titles.length; i++) {
      var text = titles[i].querySelector(".spine-text");
      if (!text) continue;
      var limit = room - 8;
      var size = 18;
      text.style.fontSize = size + "px";
      var guard = 0;
      while (text.scrollWidth > limit && size > 12 && guard < 16) {
        size -= 0.5;
        text.style.fontSize = size + "px";
        guard++;
      }
    }
  }

  function layout() {
    measure();
    var widths = [];
    var opens = [];
    var spines = [];
    var i;
    var hinge = 7;
    for (i = 0; i < n; i++) {
      var open = coverness(i);
      var spineW = metrics.spine + (hinge - metrics.spine) * open;
      opens.push(open);
      spines.push(spineW);
      widths.push(spineW + metrics.cover * open);
    }
    var centers = [];
    var x = 0;
    for (i = 0; i < n; i++) {
      centers.push(x + widths[i] / 2);
      x += widths[i] + metrics.gap;
    }
    var index = clamp(position, 0, n - 1);
    var base = Math.floor(index);
    var frac = index - base;
    var focus = centers[n - 1];
    if (base < n - 1) focus = centers[base] * (1 - frac) + centers[base + 1] * frac;
    else focus = centers[base];
    row.style.transform = "translate3d(" + (stage.clientWidth / 2 - focus) + "px,0,0)";
    for (i = 0; i < n; i++) {
      var local = 1;
      if (!reduced) {
        local = clamp((intro - i * 0.028) / 0.5, 0, 1);
        local = local * local * (3 - 2 * local);
      }
      var side = i < (n - 1) / 2 ? -1 : 1;
      if (i === Math.round((n - 1) / 2)) side = 0;
      var volume = volumes[i];
      volume.style.width = widths[i] + "px";
      volume.style.zIndex = String(1 + Math.round(opens[i] * 20));
      volume.style.opacity = String(0.2 + 0.8 * local);
      volume.style.setProperty("--open", opens[i].toFixed(4));
      volume.style.setProperty("--spine", spines[i].toFixed(2) + "px");
      var lift = opens[i] * 8 * local;
      volume.style.transform = "translate3d(" + ((1 - local) * side * 90) + "px," + ((1 - local) * 28 - lift) + "px,0) scale(" + (0.96 + 0.04 * local + opens[i] * 0.03) + ")";
    }
    fitHindi();
    var nearest = clamp(Math.round(position), 0, n - 1);
    if (nearest !== shown) {
      shown = nearest;
      show(nearest);
    }
  }

  function tick() {
    if (document.hidden) {
      running = false;
      return;
    }
    if (!dragging) {
      var delta = target - position;
      if (Math.abs(delta) < 0.001) position = target;
      else position += delta * (reduced ? 1 : 0.16);
    }
    if (reduced) intro = 1;
    else if (intro < 1) intro += (1 - intro) * 0.07;
    if (intro > 0.999) intro = 1;
    layout();
    var busy = dragging || Math.abs(target - position) > 0.001 || intro < 1;
    if (busy) requestAnimationFrame(tick);
    else running = false;
  }

  function wake() {
    if (running) return;
    running = true;
    requestAnimationFrame(tick);
  }

  function go(dir) {
    target = clamp(Math.round(target) + dir, 0, n - 1);
    wake();
  }

  prev.addEventListener("click", function () { go(-1); });
  next.addEventListener("click", function () { go(1); });

  scene.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  });

  scene.addEventListener("wheel", function (event) {
    var delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (!delta) return;
    var atStart = target <= 0.01 && delta < 0;
    var atEnd = target >= n - 1.01 && delta > 0;
    if (atStart || atEnd) return;
    event.preventDefault();
    target = clamp(target + delta * 0.0016, 0, n - 1);
    clearTimeout(scene._settle);
    scene._settle = setTimeout(function () {
      if (!dragging) {
        target = clamp(Math.round(target), 0, n - 1);
        wake();
      }
    }, 180);
    wake();
  }, { passive: false });

  stage.addEventListener("pointerdown", function (event) {
    if (event.button !== 0) return;
    pointerId = event.pointerId;
    dragStartX = event.clientX;
    dragStartTarget = position;
    dragged = false;
    dragging = true;
    stage.setPointerCapture(event.pointerId);
  });

  stage.addEventListener("pointermove", function (event) {
    if (!dragging || event.pointerId !== pointerId) return;
    var dx = event.clientX - dragStartX;
    if (Math.abs(dx) > 5) dragged = true;
    var stepPx = metrics.spine + metrics.gap + 18;
    target = clamp(dragStartTarget - dx / stepPx, 0, n - 1);
    position = target;
    wake();
  });

  function endDrag(event) {
    if (event.pointerId !== pointerId) return;
    dragging = false;
    pointerId = null;
    if (dragged) target = clamp(Math.round(position), 0, n - 1);
    wake();
  }

  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);

  window.addEventListener("resize", function () {
    hindiFit = 0;
    wake();
  });
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) wake();
  });

  build();
  measure();
  layout();
  wake();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      hindiFit = 0;
      wake();
    });
  }
})();
