// ===== TYPED TEXT EFFECT =====
const roles = [
  "BCA Student & Web Developer",
  "Aspiring Cybersecurity Analyst",
  "Full-Stack Builder",
  "CTF Enthusiast",
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.querySelector(".typed-text");

function typeEffect() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => (isDeleting = true), 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeEffect, isDeleting ? 60 : 110);
}
typeEffect();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  ".about-card, .skill-category, .project-card, .wf-step, .contact-form-wrap, .contact-info"
);
revealEls.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => observer.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll(".skill-fill");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute("data-width");
        entry.target.style.width = width + "%";
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
skillFills.forEach((el) => skillObserver.observe(el));

// ===== CONTACT FORM =====
// ⚠️ Replace the URL below with your actual Render.com backend URL after deploying
const BACKEND_URL = "https://your-app-name.onrender.com";

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  const status = document.getElementById("form-status");
  const btnText = btn.querySelector(".btn-text");
  const btnLoader = btn.querySelector(".btn-loader");

  // UI: loading state
  btnText.style.display = "none";
  btnLoader.style.display = "inline";
  btn.disabled = true;
  status.textContent = "";
  status.className = "form-status";

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  try {
    const res = await fetch(`${BACKEND_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      status.textContent = "✓ Message received! I'll get back to you soon.";
      status.className = "form-status success";
      document.getElementById("contactForm").reset();
    } else {
      throw new Error(result.error || "Server error");
    }
  } catch (err) {
    // Fallback: show error with helpful message
    if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
      status.textContent = "⚠ Backend not connected yet. Set up your Render backend first!";
    } else {
      status.textContent = "✗ Error: " + err.message;
    }
    status.className = "form-status error";
  } finally {
    btnText.style.display = "inline";
    btnLoader.style.display = "none";
    btn.disabled = false;
  }
});

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color =
            link.getAttribute("href") === `#${entry.target.id}`
              ? "var(--accent2)"
              : "";
        });
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach((s) => sectionObserver.observe(s));
