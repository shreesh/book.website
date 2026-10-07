
(function () {
  var grid = document.getElementById("catalog-grid");
  if (!grid) return;
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
  var empty = document.getElementById("catalog-empty");
  var count = document.getElementById("catalog-count");
  var search = document.getElementById("catalog-search");
  var lang = "all";
  var subject = "all";

  function apply() {
    var q = (search.value || "").trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (card) {
      var langs = card.getAttribute("data-lang");
      var subjects = card.getAttribute("data-subjects");
      var hay = card.getAttribute("data-search");
      var okLang = lang === "all" || langs === lang;
      var okSubject = subject === "all" || subjects.split(" ").indexOf(subject) !== -1;
      var okQuery = !q || hay.indexOf(q) !== -1;
      var visible = okLang && okSubject && okQuery;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    count.textContent = shown + (shown === 1 ? " title" : " titles");
    empty.hidden = shown !== 0;
  }

  function bind(group, set) {
    group.forEach(function (button) {
      button.addEventListener("click", function () {
        group.forEach(function (other) { other.setAttribute("aria-pressed", "false"); });
        button.setAttribute("aria-pressed", "true");
        set(button.getAttribute("data-value"));
        var url = new URL(window.location.href);
        if (lang === "all") url.searchParams.delete("lang"); else url.searchParams.set("lang", lang);
        if (subject === "all") url.searchParams.delete("subject"); else url.searchParams.set("subject", subject);
        if ((search.value || "").trim()) url.searchParams.set("q", search.value.trim());
        else url.searchParams.delete("q");
        history.replaceState(null, "", url);
        apply();
      });
    });
  }

  var langButtons = Array.prototype.slice.call(document.querySelectorAll("[data-filter='lang']"));
  var subjectButtons = Array.prototype.slice.call(document.querySelectorAll("[data-filter='subject']"));
  bind(langButtons, function (value) { lang = value; });
  bind(subjectButtons, function (value) { subject = value; });
  search.addEventListener("input", apply);

  var params = new URLSearchParams(window.location.search);
  function press(buttons, value) {
    var match = buttons.filter(function (button) { return button.getAttribute("data-value") === value; })[0];
    if (!match) return false;
    buttons.forEach(function (button) { button.setAttribute("aria-pressed", "false"); });
    match.setAttribute("aria-pressed", "true");
    return true;
  }
  if (params.get("lang") && press(langButtons, params.get("lang"))) lang = params.get("lang");
  if (params.get("subject") && press(subjectButtons, params.get("subject"))) subject = params.get("subject");
  if (params.get("q")) search.value = params.get("q");
  apply();
})();
