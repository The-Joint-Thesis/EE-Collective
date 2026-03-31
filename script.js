// Anchor smooth scroll fallback (older browsers)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});


// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Auto-close on link tap (mobile UX)
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}


// Viewport reveal animations
const animatedEls = document.querySelectorAll("[data-animate]");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const delay = el.getAttribute("data-delay") || 0;

      setTimeout(() => {
        el.classList.add("animated");
      }, parseFloat(delay) * 1000);

      // fire once per element
      observer.unobserve(el);
    });
  },
  { threshold: 0.15 }
);

animatedEls.forEach(el => observer.observe(el));


// Footer year auto-update
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


// Auto-rotating carousel ("Why this project exists")
(function () {
  const track = document.getElementById("projectTrack");
  const indicators = document.querySelectorAll("#projectIndicators .indicator");
  if (!track || indicators.length === 0) return;

  const cards = track.querySelectorAll(".project-card");
  const total = cards.length;
  let current = 0;

  // Move carousel to index
  function goTo(index) {
    current = (index + total) % total;     // wrap
    const offset = -current * 100;         // 1 card = 100%
    track.style.transform = `translateX(${offset}%)`;

    indicators.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  }

  // Auto-advance
  let timer = setInterval(() => goTo(current + 1), 3000);

  // Indicator navigation
  indicators.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      clearInterval(timer);
      goTo(i);
      timer = setInterval(() => goTo(current + 1), 3000);
    });
  });

  // Initial state
  goTo(0);
})();

// Expandable Table of Contents
document.querySelectorAll(".toc-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    const targetId = btn.getAttribute("aria-controls");
    const body = document.getElementById(targetId);
    if (!body) return;

    btn.setAttribute("aria-expanded", String(!expanded));
    if (expanded) {
      body.hidden = true;
    } else {
      body.hidden = false;
    }
  });
});


// curiosity got you here. nice.



