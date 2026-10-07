
(function () {
  var form = document.getElementById("enquire-form");
  if (!form) return;
  var select = document.getElementById("book");
  var params = new URLSearchParams(window.location.search);
  var wanted = params.get("book");
  if (wanted && select.querySelector("option[value='" + wanted + "']")) {
    select.value = wanted;
  }
  var result = document.getElementById("enquire-result");
  var text = document.getElementById("enquire-text");
  var error = document.getElementById("form-error");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var book = select.options[select.selectedIndex].text;
    var message = form.message.value.trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !emailOk || !message || !select.value) {
      error.hidden = false;
      return;
    }
    error.hidden = true;
    text.textContent =
      "Enquiry for Madhav Vidya Bhavan\n" +
      "From: " + name + " <" + email + ">\n" +
      "Book: " + book + "\n\n" +
      message;
    result.hidden = false;
    form.hidden = true;
    result.scrollIntoView({ block: "nearest" });
  });

  document.getElementById("copy-note").addEventListener("click", function () {
    var done = function () {
      document.getElementById("copy-note").textContent = "Copied";
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text.textContent).then(done);
    }
  });

  document.getElementById("another").addEventListener("click", function () {
    result.hidden = true;
    form.hidden = false;
    form.message.value = "";
    document.getElementById("copy-note").textContent = "Copy note";
  });
})();
