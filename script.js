/* ===========================================================
   PARADISE PINK FESTIVAL — Site interactivity
   =========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

                            /* ---- Nav scroll state ---- */
                            const nav = document.querySelector(".nav");
    const onScroll = () => {
          if (window.scrollY > 40) nav.classList.add("scrolled");
          else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

                            /* ---- Mobile menu ---- */
                            const toggle = document.querySelector(".nav-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeBtn = document.querySelector(".mobile-close");
    if (toggle && mobileMenu) {
          toggle.addEventListener("click", () => mobileMenu.classList.add("open"));
          closeBtn.addEventListener("click", () => mobileMenu.classList.remove("open"));
          mobileMenu.querySelectorAll("a").forEach((a) =>
                  a.addEventListener("click", () => mobileMenu.classList.remove("open"))
                                                       );
    }

                            /* ---- Reveal on scroll ---- */
                            const revealEls = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
          (entries) => {
                  entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                        entry.target.classList.add("in");
                                        io.unobserve(entry.target);
                            }
                  });
          },
      { threshold: 0.15 }
        );
    revealEls.forEach((el) => io.observe(el));

                            /* ---- Inquiry form tabs ---- */
                            const tabs = document.querySelectorAll(".form-tab");
    const typeField = document.getElementById("inquiry-type");
    tabs.forEach((tab) => {
          tab.addEventListener("click", () => {
                  tabs.forEach((t) => t.classList.remove("active"));
                  tab.classList.add("active");
                  if (typeField) typeField.value = tab.dataset.type;
          });
    });

                            /* ---- Form success states (Netlify AJAX submit) ---- */
                            const handleFormSubmit = (formId, successId) => {
                                  const form = document.getElementById(formId);
                                  const success = document.getElementById(successId);
                                  if (!form) return;
                                  form.addEventListener("submit", (e) => {
                                          e.preventDefault();
                                          const data = new FormData(form);
                                          fetch("/", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                                                    body: new URLSearchParams(data).toString(),
                                          })
                                            .then(() => {
                                                        form.style.display = "none";
                                                        if (success) success.style.display = "block";
                                            })
                                            .catch(() => {
                                                        form.style.display = "none";
                                                        if (success) success.style.display = "block";
                                            });
                                  });
                            };
    handleFormSubmit("inquiry-form", "inquiry-success");
    handleFormSubmit("newsletter-form", "newsletter-success");

                            /* =========================================================
       DEGETA BACKGROUND MOTIF
       Exact port of the digital-rain effect from
       galaxygleammedia.com (same algorithm, timing, and layout),
       recolored from green to Paradise Pink blush + gold.
       ========================================================= */
                            const canvas = document.getElementById("degeta-canvas");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

                            if (canvas && !reduceMotion) {
                                  const ctx = canvas.getContext("2d");
                                  let w, h, columns, drops;
                                  const word = "DEGETA";

      function resize() {
              w = canvas.width = window.innerWidth;
              h = canvas.height = window.innerHeight;
              const fontSize = 16;
              columns = Math.floor(w / fontSize);
              drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * word.length));
      }
                                  resize();
                                  window.addEventListener("resize", resize);

      function draw() {
              ctx.fillStyle = "rgba(10,10,13,0.10)";
              ctx.fillRect(0, 0, w, h);
              ctx.font = "16px monospace";
              for (let i = 0; i < drops.length; i++) {
                        const letterIndex = drops[i] % word.length;
                        const text = word[letterIndex];
                        ctx.fillStyle = letterIndex === 0 ? "rgba(255,105,180,0.45)" : "rgba(255,20,147,0.30)";
                        ctx.fillText(text, i * 16, drops[i] * 16);
                        drops[i]++;
                        if (drops[i] * 16 > h + 16) {
                                    drops[i] = drops[i] % word.length;
                        }
              }
      }
                                  setInterval(draw, 90);
                            } else if (canvas) {
                                  // Reduced motion: draw one static, gentle pass instead of animating.
      const ctx = canvas.getContext("2d");
                                  const w = (canvas.width = window.innerWidth);
                                  const h = (canvas.height = window.innerHeight);
                                  const word = "DEGETA";
                                  ctx.fillStyle = "#0a0a0d";
                                  ctx.fillRect(0, 0, w, h);
                                  ctx.font = "16px monospace";
                                  const columns = Math.floor(w / 16);
                                  for (let i = 0; i < columns; i++) {
                                          const rows = Math.floor(h / 16);
                                          for (let r = 0; r < rows; r++) {
                                                    if (Math.random() > 0.75) {
                                                                const letterIndex = r % word.length;
                                                                ctx.fillStyle = letterIndex === 0 ? "rgba(255,105,180,0.4)" : "rgba(255,20,147,0.25)";
                                                                ctx.fillText(word[letterIndex], i * 16, r * 16);
                                                    }
                                          }
                                  }
                            }
});
