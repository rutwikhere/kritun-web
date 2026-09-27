/**
 * KRITUN — Official Brand Website Engine
 * Minimal, accessible, zero fabricated data
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initMobileNav();
  initScrollReveals();
  initNetworkCanvas();
  initQrModal();
  initCopyrightYear();
});

// =========================================================================
// 1. NAVBAR SCROLL EFFECT
// =========================================================================
function initNavbarScroll() {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// =========================================================================
// 2. FULLSCREEN MOBILE NAVIGATION
// =========================================================================
function initMobileNav() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("mobileCloseBtn");
  const overlay = document.getElementById("mobileNavOverlay");
  const links = document.querySelectorAll(".mobile-link");

  if (!menuBtn || !overlay) return;

  const openMenu = () => {
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  menuBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeMenu();
  });

  links.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
      closeMenu();
    }
  });
}

// =========================================================================
// 3. SCROLL REVEALS
// =========================================================================
function initScrollReveals() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealElements.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// =========================================================================
// 4. ABSTRACT NETWORK CONSTELLATION (Section 5 Discovery Canvas)
// =========================================================================
function initNetworkCanvas() {
  const canvas = document.getElementById("networkCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.width = 480;
  const height = canvas.height = 480;
  const cx = width / 2;
  const cy = height / 2;

  const nodeCount = 14;
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2 + Math.random() * 0.4;
    const distance = 110 + Math.random() * 95;
    nodes.push({
      x: cx + Math.cos(angle) * distance,
      y: cy + Math.sin(angle) * distance,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2.5 + 2,
      isCrimson: Math.random() > 0.4,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between nodes
    for (let i = 0; i < nodes.length; i++) {
      const na = nodes[i];

      // Update gentle drift
      na.x += na.vx;
      na.y += na.vy;
      const distFromCenter = Math.sqrt((na.x - cx) ** 2 + (na.y - cy) ** 2);
      if (distFromCenter < 90 || distFromCenter > 220) {
        na.vx *= -1;
        na.vy *= -1;
      }

      // Connect to center hub
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(na.x, na.y);
      ctx.strokeStyle = "rgba(229, 57, 53, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Connect to neighbor nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const nb = nodes[j];
        const d = Math.sqrt((na.x - nb.x) ** 2 + (na.y - nb.y) ** 2);
        if (d < 120) {
          const alpha = (1 - d / 120) * 0.15;
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw node point
      ctx.beginPath();
      ctx.arc(na.x, na.y, na.radius, 0, Math.PI * 2);
      ctx.fillStyle = na.isCrimson ? "#E53935" : "#FFFFFF";
      ctx.shadowColor = na.isCrimson ? "rgba(229, 57, 53, 0.8)" : "transparent";
      ctx.shadowBlur = na.isCrimson ? 10 : 0;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(draw);
  }

  draw();
}

// =========================================================================
// 5. QR MODAL
// =========================================================================
function initQrModal() {
  const openBtn1 = document.getElementById("openQrBtn");
  const openBtn2 = document.getElementById("openQrBtn2");
  const closeBtn = document.getElementById("closeQrBtn");
  const modal = document.getElementById("qrModal");

  if (!modal) return;

  const openModal = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (openBtn1) openBtn1.addEventListener("click", openModal);
  if (openBtn2) openBtn2.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}

// =========================================================================
// 6. COPYRIGHT YEAR
// =========================================================================
function initCopyrightYear() {
  const yearEl = document.getElementById("copyrightYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
