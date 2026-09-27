/**
 * KRITUN — Living Brand & Motion Engine
 * Design Standard: Dark, Premium, Living Editorial Gaming Identity
 * Features: Multi-layer ambient motion, cursor glow, scroll progress rail,
 *           living network canvas, magnetic buttons, text scramble & horizontal motion.
 * Zero fabricated data. 60fps performance architecture.
 */

document.addEventListener("DOMContentLoaded", () => {
  initSmartNavbar();
  initMobileNav();
  initCursorGlow();
  initScrollProgress();
  initScrollParallax();
  initSectionObserver();
  initManifestoScrollSequence();
  initSquadsScrollSequence();
  initHorizontalMotion();
  initNetworkAnimation();
  initMagneticButtons();
  initTextScramble();
  initActiveNavigation();
  initQrModal();
  initCopyrightYear();
});

// =========================================================================
// 1. SMART INTELLIGENT NAVBAR
// =========================================================================
function initSmartNavbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateNavbar = () => {
    const currentScrollY = window.scrollY;

    // Scrolled state
    if (currentScrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    // Hide/Show on direction
    if (currentScrollY > 200 && currentScrollY > lastScrollY && !nav.classList.contains("nav-hidden")) {
      nav.classList.add("nav-hidden");
    } else if (currentScrollY < lastScrollY && nav.classList.contains("nav-hidden")) {
      nav.classList.remove("nav-hidden");
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  updateNavbar();
}

// =========================================================================
// 2. CURSOR-REACTIVE AMBIENT LIGHT (Desktop Only)
// =========================================================================
function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(pointer: fine)").matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let isMoving = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving) {
      glow.classList.add("active");
      isMoving = true;
    }
  }, { passive: true });

  document.addEventListener("mouseleave", () => {
    glow.classList.remove("active");
  });

  const render = () => {
    // Smooth lerp (linear interpolation)
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate3d(-50%, -50%, 0)`;
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
}

// =========================================================================
// 3. SCROLL PROGRESS INDICATOR (Mobile Top Bar & Desktop Left Rail)
// =========================================================================
function initScrollProgress() {
  const mobileBar = document.getElementById("mobileProgressBar");
  const railFill = document.getElementById("railFill");
  const railIndicator = document.getElementById("railIndicator");
  const railCounter = document.getElementById("railCounter");
  const sections = document.querySelectorAll("section[data-chapter]");

  const updateProgress = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;

    // Update Mobile Bar
    if (mobileBar) {
      mobileBar.style.width = `${progress * 100}%`;
    }

    // Update Desktop Left Rail
    if (railFill && railIndicator) {
      const trackHeight = 140; // matches .rail-track height
      railFill.style.height = `${progress * 100}%`;
      railIndicator.style.transform = `translateY(${progress * (trackHeight - 8)}px)`;
    }

    // Update Chapter Counter
    if (railCounter && sections.length > 0) {
      const scrollMiddle = window.scrollY + window.innerHeight * 0.4;
      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollMiddle >= top && scrollMiddle < top + height) {
          const chapter = sec.getAttribute("data-chapter");
          if (chapter && railCounter.textContent !== chapter) {
            railCounter.textContent = chapter;
          }
        }
      });
    }
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

// =========================================================================
// 4. SCROLL PARALLAX ENGINE
// =========================================================================
function initScrollParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const parallaxElements = document.querySelectorAll("[data-parallax]");
  if (!parallaxElements.length) return;

  const onScroll = () => {
    const vh = window.innerHeight;
    parallaxElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        const speed = parseFloat(el.getAttribute("data-parallax")) || 0.1;
        const yOffset = (rect.top - vh / 2) * speed;
        el.style.transform = `translate3d(0, ${yOffset}px, 0)`;
      }
    });
  };

  window.addEventListener("scroll", () => {
    requestAnimationFrame(onScroll);
  }, { passive: true });
}

// =========================================================================
// 5. ADVANCED SCROLL REVEAL ENGINE
// =========================================================================
function initSectionObserver() {
  const revealElements = document.querySelectorAll(".reveal-up, .reveal-blur, .reveal-scale, .reveal-left, .reveal-line");
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
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// =========================================================================
// 6. MANIFESTO SEQUENTIAL SCROLL ACTIVATION
// =========================================================================
function initManifestoScrollSequence() {
  const pillars = document.querySelectorAll("#manifestoFlow .manifesto-pillar");
  if (!pillars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          pillars.forEach((p) => p.classList.remove("active-pillar"));
          entry.target.classList.add("active-pillar");
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "-10% 0px -20% 0px",
    }
  );

  pillars.forEach((p) => observer.observe(p));
}

// =========================================================================
// 7. SQUADS SEQUENTIAL ACTIVATION
// =========================================================================
function initSquadsScrollSequence() {
  const roles = document.querySelectorAll("#squadsArray .tactical-role-column");
  if (!roles.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          roles.forEach((r) => r.classList.remove("active-role"));
          entry.target.classList.add("active-role");
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "-10% 0px -20% 0px",
    }
  );

  roles.forEach((r) => observer.observe(r));
}

// =========================================================================
// 8. HORIZONTAL MOTION (COMMUNITY MANTRA)
// =========================================================================
function initHorizontalMotion() {
  const section = document.getElementById("mantra");
  const track = document.getElementById("marqueeTrack");
  if (!section || !track) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let baseOffset = 0;

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    if (rect.top < vh && rect.bottom > 0) {
      // Relative progress through the section
      const progress = (vh - rect.top) / (vh + rect.height);
      baseOffset = (progress - 0.5) * 280;
      track.style.transform = `translate3d(${-baseOffset}px, 0, 0)`;
    }
  };

  window.addEventListener("scroll", () => {
    requestAnimationFrame(onScroll);
  }, { passive: true });
}

// =========================================================================
// 9. LIVING ABSTRACT NETWORK ANIMATION (Canvas)
// =========================================================================
function initNetworkAnimation() {
  const canvas = document.getElementById("networkCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.width = 480;
  const height = canvas.height = 480;
  const cx = width / 2;
  const cy = height / 2;

  let isVisible = true;
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.05 });
  observer.observe(canvas);

  const nodeCount = 18;
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    const baseAngle = (i / nodeCount) * Math.PI * 2;
    const distance = 100 + Math.random() * 115;
    nodes.push({
      angle: baseAngle,
      orbitRadius: distance,
      orbitSpeed: (0.003 + Math.random() * 0.004) * (i % 2 === 0 ? 1 : -1),
      x: cx + Math.cos(baseAngle) * distance,
      y: cy + Math.sin(baseAngle) * distance,
      size: Math.random() * 2.5 + 2,
      isCrimson: Math.random() > 0.45,
    });
  }

  // Animated traveling signal pulses along links
  const pulses = [
    { from: 0, to: 3, progress: 0, speed: 0.015 },
    { from: 5, to: 8, progress: 0.5, speed: 0.012 },
    { from: 10, to: 14, progress: 0.2, speed: 0.018 },
  ];

  function draw() {
    if (!isVisible) {
      requestAnimationFrame(draw);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Update orbit positions
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.angle += n.orbitSpeed;
      n.x = cx + Math.cos(n.angle) * n.orbitRadius;
      n.y = cy + Math.sin(n.angle) * n.orbitRadius;

      // Spoke to center
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(n.x, n.y);
      ctx.strokeStyle = "rgba(229, 57, 53, 0.09)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inter-node connections
      for (let j = i + 1; j < nodes.length; j++) {
        const nb = nodes[j];
        const dist = Math.hypot(n.x - nb.x, n.y - nb.y);
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.16;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw node marker
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
      ctx.fillStyle = n.isCrimson ? "#E53935" : "#FFFFFF";
      ctx.shadowColor = n.isCrimson ? "rgba(229, 57, 53, 0.8)" : "transparent";
      ctx.shadowBlur = n.isCrimson ? 10 : 0;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Draw traveling signal packets
    pulses.forEach((p) => {
      p.progress += p.speed;
      if (p.progress >= 1) {
        p.progress = 0;
        p.from = Math.floor(Math.random() * nodes.length);
        p.to = Math.floor(Math.random() * nodes.length);
      }
      const na = nodes[p.from];
      const nb = nodes[p.to];
      if (na && nb) {
        const px = na.x + (nb.x - na.x) * p.progress;
        const py = na.y + (nb.y - na.y) * p.progress;
        ctx.beginPath();
        ctx.arc(px, py, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = "#E53935";
        ctx.shadowColor = "rgba(229, 57, 53, 0.9)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}

// =========================================================================
// 10. MAGNETIC BUTTONS (Desktop Only)
// =========================================================================
function initMagneticButtons() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const magneticBtns = document.querySelectorAll(".btn-magnetic");

  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate3d(0, 0, 0)";
    });
  });
}

// =========================================================================
// 11. SELECTIVE TEXT SCRAMBLE / CYBER REVEAL
// =========================================================================
function initTextScramble() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const scrambleElements = document.querySelectorAll("[data-scramble]");
  if (!scrambleElements.length) return;

  const chars = "!<>-_\\/[]{}—=+*^?#";

  const runScramble = (el) => {
    const targetText = el.getAttribute("data-scramble");
    let iteration = 0;
    const maxIterations = targetText.length * 3;

    const interval = setInterval(() => {
      el.innerText = targetText
        .split("")
        .map((letter, index) => {
          if (index < iteration / 3) {
            return targetText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= maxIterations) {
        clearInterval(interval);
        el.innerText = targetText;
      }
      iteration++;
    }, 28);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runScramble(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  scrambleElements.forEach((el) => observer.observe(el));
}

// =========================================================================
// 12. ACTIVE NAVIGATION SCROLL-SPY
// =========================================================================
function initActiveNavigation() {
  const navItems = document.querySelectorAll(".nav-item[data-section]");
  const sections = document.querySelectorAll("section[id]");
  if (!navItems.length || !sections.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach((link) => {
          if (link.getAttribute("data-section") === id) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

// =========================================================================
// 13. FULLSCREEN MOBILE NAVIGATION
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
// 14. QR CODE MODAL
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
    if (closeBtn) closeBtn.focus();
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
// 15. COPYRIGHT YEAR
// =========================================================================
function initCopyrightYear() {
  const el = document.getElementById("copyrightYear");
  if (el) {
    el.textContent = new Date().getFullYear();
  }
}
