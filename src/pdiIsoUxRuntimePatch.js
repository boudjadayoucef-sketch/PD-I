/**
 * 008e — PD&I ISO Precision UX Runtime Patch
 * Ajoute un bouton retour si absent et bloque le scroll navigateur sur la zone ISO.
 */
(function pdiIsoUxRuntimePatch() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.__PDI_ISO_UX_RUNTIME_008E__) return;
  window.__PDI_ISO_UX_RUNTIME_008E__ = true;

  const STATE = { zoom: 1, panX: 0, panY: 0, isPanning: false, lastX: 0, lastY: 0, timer: null };
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const textOf = (el) => (el && el.textContent ? el.textContent : "").trim();

  function isIsoScreen() {
    const txt = document.body ? document.body.innerText || "" : "";
    return /Vue isométrique|Schéma isométrique|Branche ISO|Graphe valide/i.test(txt);
  }

  function findHomeButton() {
    return Array.from(document.querySelectorAll("button, a, [role='button']")).find((el) => /Accueil/i.test(textOf(el)));
  }

  function goHome() {
    const existing = findHomeButton();
    if (existing && !existing.classList.contains("pdi-runtime-back-home")) {
      existing.click();
      return;
    }
    window.dispatchEvent(new CustomEvent("pdi:navigate-home", { detail: { source: "008e-runtime" } }));
    if (window.location.hash && window.location.hash !== "#/") window.location.hash = "#/";
  }

  function findIsoHeader() {
    return Array.from(document.querySelectorAll("header, nav, div")).find((el) => {
      const t = textOf(el);
      return /Vue isométrique|Schéma isométrique|Projet actif/i.test(t) && /Fichier/i.test(t) && /Affichage/i.test(t);
    });
  }

  function ensureBackButton() {
    if (!isIsoScreen()) return;
    if (document.querySelector(".pdi-runtime-back-home, .pdi-iso-back-btn")) return;
    const header = findIsoHeader();
    if (!header) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pdi-runtime-back-home";
    btn.title = "Retour à l’accueil PD&I";
    btn.textContent = "← Accueil";
    btn.addEventListener("click", goHome);
    header.insertBefore(btn, header.firstChild);
  }

  function findCanvasOrWorkspace() {
    return document.querySelector("canvas") || Array.from(document.querySelectorAll("div, section, main")).find((el) => {
      const cls = String(el.className || "");
      return /canvas|grid|workspace|drawing|iso/i.test(cls) && el.clientWidth > 600;
    });
  }

  function badge() {
    let b = document.querySelector(".pdi-runtime-zoom-badge");
    if (!b) {
      b = document.createElement("div");
      b.className = "pdi-runtime-zoom-badge";
      document.body.appendChild(b);
    }
    return b;
  }

  function showZoom() {
    const b = badge();
    b.textContent = `Zoom ${Math.round(STATE.zoom * 100)}%`;
    b.classList.add("is-visible");
    clearTimeout(STATE.timer);
    STATE.timer = setTimeout(() => b.classList.remove("is-visible"), 650);
  }

  function attachWheelPrecision() {
    if (!isIsoScreen()) return;
    const target = findCanvasOrWorkspace();
    if (!target || target.__PDI_WHEEL_PATCHED_008E__) return;
    target.__PDI_WHEEL_PATCHED_008E__ = true;
    target.style.touchAction = "none";
    target.style.userSelect = "none";

    target.addEventListener("wheel", function (event) {
      event.preventDefault();
      event.stopPropagation();

      window.dispatchEvent(new CustomEvent("pdi:iso-wheel", {
        detail: { clientX: event.clientX, clientY: event.clientY, deltaY: event.deltaY }
      }));

      // Fallback visuel seulement si aucun label Zoom n'est détecté.
      const bodyText = document.body ? document.body.innerText || "" : "";
      if (/Zoom\s*\d+%/i.test(bodyText) && !window.__PDI_FORCE_FALLBACK_ZOOM__) return;

      const rect = target.getBoundingClientRect();
      const mx = event.clientX - rect.left;
      const my = event.clientY - rect.top;
      const before = { x: (mx - STATE.panX) / STATE.zoom, y: (my - STATE.panY) / STATE.zoom };
      const nextZoom = clamp(STATE.zoom * (event.deltaY > 0 ? 0.92 : 1.08), 0.25, 4);
      STATE.panX = mx - before.x * nextZoom;
      STATE.panY = my - before.y * nextZoom;
      STATE.zoom = nextZoom;
      target.style.transformOrigin = "0 0";
      target.style.transform = `translate(${STATE.panX}px, ${STATE.panY}px) scale(${STATE.zoom})`;
      showZoom();
    }, { passive: false });

    target.addEventListener("mousedown", function (event) {
      if (event.button !== 1 && !event.altKey) return;
      event.preventDefault();
      STATE.isPanning = true;
      STATE.lastX = event.clientX;
      STATE.lastY = event.clientY;
      document.body.classList.add("pdi-panning");
    });

    window.addEventListener("mousemove", function (event) {
      if (!STATE.isPanning) return;
      STATE.panX += event.clientX - STATE.lastX;
      STATE.panY += event.clientY - STATE.lastY;
      STATE.lastX = event.clientX;
      STATE.lastY = event.clientY;
      target.style.transformOrigin = "0 0";
      target.style.transform = `translate(${STATE.panX}px, ${STATE.panY}px) scale(${STATE.zoom})`;
    });

    window.addEventListener("mouseup", function () {
      STATE.isPanning = false;
      document.body.classList.remove("pdi-panning");
    });
  }

  function markCanvas() {
    document.querySelectorAll("canvas").forEach((c) => {
      c.style.touchAction = "none";
      c.style.userSelect = "none";
      c.dataset.pdiPrecisionPatch = "008e";
    });
  }

  function run() {
    ensureBackButton();
    attachWheelPrecision();
    markCanvas();
  }

  const observer = new MutationObserver(run);
  function start() {
    run();
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    window.addEventListener("resize", run);
    window.addEventListener("hashchange", run);
    window.addEventListener("popstate", run);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
