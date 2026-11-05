/* ============================================================
   DPA4-Air × LiF 闭环执行手册 · 站点脚本
   1. 复制代码块  2. 清单持久化 + 跨页进度  3. 移动端导航
   ============================================================ */
(function () {
  "use strict";

  var KEY = "dpa4-lif-runbook-checks-v1";
  var TOTAL = 13;

  /* ---------------- 1. 复制 ---------------- */
  function fallbackCopy(text, cb) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); cb(); } catch (e) { /* 忽略 */ }
    document.body.removeChild(ta);
  }

  Array.prototype.forEach.call(document.querySelectorAll(".copy"), function (btn) {
    btn.addEventListener("click", function () {
      var wrap = btn.parentNode;
      var codeEl = wrap.querySelector("code");
      var text = codeEl ? codeEl.innerText : wrap.innerText;
      function done() {
        var old = btn.textContent;
        btn.textContent = "已复制";
        btn.classList.add("done");
        setTimeout(function () {
          btn.textContent = old;
          btn.classList.remove("done");
        }, 1400);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
      } else {
        fallbackCopy(text, done);
      }
    });
  });

  /* ---------------- 2. 清单 ---------------- */
  function readState() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; }
  }
  function writeState(obj) {
    try { localStorage.setItem(KEY, JSON.stringify(obj)); } catch (e) { /* 隐私模式忽略 */ }
  }
  function updateSideProgress() {
    var el = document.getElementById("sideProg");
    if (!el) return;
    var st = readState(), n = 0;
    Object.keys(st).forEach(function (k) { if (st[k]) n++; });
    el.textContent = n + " / " + TOTAL;
  }

  var boxes = Array.prototype.slice.call(document.querySelectorAll("#checks input"));
  var cnt = document.getElementById("cnt");
  var bar = document.getElementById("bar");

  if (boxes.length) {
    var saved = readState();
    boxes.forEach(function (b) { if (saved[b.id]) b.checked = true; });

    function render() {
      var n = boxes.filter(function (b) { return b.checked; }).length;
      if (cnt) cnt.textContent = String(n);
      if (bar) bar.style.width = (n / boxes.length * 100) + "%";
      updateSideProgress();
    }

    boxes.forEach(function (b) {
      b.addEventListener("change", function () {
        var st = readState();
        st[b.id] = b.checked;
        writeState(st);
        render();
      });
    });

    var reset = document.getElementById("reset");
    if (reset) {
      reset.addEventListener("click", function () {
        if (!window.confirm("清空全部勾选？")) return;
        boxes.forEach(function (b) { b.checked = false; });
        writeState({});
        render();
      });
    }

    render();
  } else {
    updateSideProgress();
  }

  /* ---------------- 3. 移动端导航 ---------------- */
  var tog = document.getElementById("navtog");
  var scrim = document.getElementById("scrim");

  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    if (tog) tog.setAttribute("aria-expanded", open ? "true" : "false");
    if (scrim) scrim.hidden = !open;
  }

  if (tog) {
    tog.addEventListener("click", function () {
      setNav(!document.body.classList.contains("nav-open"));
    });
  }
  if (scrim) scrim.addEventListener("click", function () { setNav(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setNav(false);
  });
  // 点了导航就自动收起
  Array.prototype.forEach.call(document.querySelectorAll(".side a"), function (a) {
    a.addEventListener("click", function () { setNav(false); });
  });

  /* ---------------- 4. 键盘帮助：/ 聚焦导航 ---------------- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
      var first = document.querySelector(".side a");
      if (first) { e.preventDefault(); first.focus(); }
    }
  });
})();
