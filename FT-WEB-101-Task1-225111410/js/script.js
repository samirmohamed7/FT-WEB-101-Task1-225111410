// ==========================================================================
// Samir Mohamed Samir - FT-WEB-101 Task 1
// Interactive Features & JavaScript Architecture
// Warm Brown & Creamy Palette Controller
// ==========================================================================

// Set dynamic copyright year in footer
var yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ==========================================================================
// 1. NIGHT MODE / DARK MODE CONTROLLER
// ==========================================================================
var themeToggle = document.getElementById("themeToggle");
var themeIcon = document.getElementById("themeIcon");
var themeText = document.getElementById("themeText");
var themeMeta = document.getElementById("themeMeta");

function updateThemeUI(theme) {
  var isDark = theme === "dark";
  if (isDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeIcon) themeIcon.textContent = "☀️";
    if (themeText) themeText.textContent = "Light Mode";
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", "true");
      themeToggle.setAttribute("aria-label", "Switch to Light Mode");
    }
    if (themeMeta) themeMeta.setAttribute("content", "#140d0a");
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (themeIcon) themeIcon.textContent = "🌙";
    if (themeText) themeText.textContent = "Dark Mode";
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", "false");
      themeToggle.setAttribute("aria-label", "Switch to Dark Mode");
    }
    if (themeMeta) themeMeta.setAttribute("content", "#f5efe6");
  }
}

// Read current theme state (set by the inline script in <head> or default)
var currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
updateThemeUI(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    var isNowDark = document.documentElement.getAttribute("data-theme") === "dark";
    var newTheme = isNowDark ? "light" : "dark";
    localStorage.setItem("sms_theme", newTheme);
    updateThemeUI(newTheme);
    burst(6); // Celebratory particle burst
  });
}

// Listen to OS system preference changes if user hasn't explicitly set a preference
if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (!localStorage.getItem("sms_theme")) {
      updateThemeUI(e.matches ? "dark" : "light");
    }
  });
}

// ==========================================================================
// 2. FLOATING PARTICLES & CHEER COUNTER
// ==========================================================================
var particleLayer = document.getElementById("particles");
var particleSymbols = ["⚡", "🔥", "⭐", "💻", "✨", "🏋️"];

function burst(n) {
  if (!particleLayer) return;
  for (var i = 0; i < n; i++) {
    (function (k) {
      setTimeout(function () {
        var p = document.createElement("span");
        p.className = "particle";
        p.textContent = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
        p.style.left = Math.random() * 90 + 5 + "%";
        p.style.fontSize = 16 + Math.random() * 22 + "px";
        p.style.animationDuration = 2.4 + Math.random() * 1.6 + "s";
        particleLayer.appendChild(p);
        setTimeout(function () {
          p.remove();
        }, 4200);
      }, k * 70);
    })(i);
  }
}

var cheerCountEl = document.getElementById("cheerCount");
var savedCheers = parseInt(localStorage.getItem("sms_cheerCount") || "0", 10);
var cheers = isNaN(savedCheers) ? 0 : savedCheers;
if (cheerCountEl) cheerCountEl.textContent = cheers;

var cheerBtn = document.getElementById("cheerBtn");
if (cheerBtn) {
  cheerBtn.addEventListener("click", function () {
    cheers++;
    if (cheerCountEl) cheerCountEl.textContent = cheers;
    localStorage.setItem("sms_cheerCount", cheers);
    burst(10);
  });
}

// ==========================================================================
// 3. SKILLS WITH INTERACTIVE STAR RATINGS
// ==========================================================================
var skills = [
  { name: "C# & Object-Oriented Programming", level: 5 },
  { name: "Python & Algorithmic Problem Solving", level: 4 },
  { name: "HTML5 & Semantic Markup", level: 5 },
  { name: "CSS3 & Modern Responsive Layouts", level: 4 },
  { name: "JavaScript (ES6+) Fundamentals", level: 4 },
  { name: "Online Coaching & Fitness Guidance", level: 5 }
];

var skillList = document.getElementById("skillList");
if (skillList) {
  skills.forEach(function (s) {
    var row = document.createElement("div");
    row.className = "skill";

    var label = document.createElement("span");
    label.textContent = s.name;
    row.appendChild(label);

    var rate = document.createElement("span");
    rate.className = "rate";
    rate.setAttribute("role", "group");
    rate.setAttribute("aria-label", s.name + " rating");

    function paint(previewLevel) {
      var activeLevel = typeof previewLevel === "number" ? previewLevel : s.level;
      var buttons = rate.querySelectorAll("button");
      buttons.forEach(function (b, i) {
        var isOn = i < activeLevel;
        b.classList.toggle("on", isOn);
        b.setAttribute("aria-pressed", isOn ? "true" : "false");
      });
    }

    for (var i = 1; i <= 5; i++) {
      (function (n) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = "★";
        b.setAttribute("aria-label", "Rate " + n + " out of 5 for " + s.name);

        b.addEventListener("mouseenter", function () {
          paint(n);
        });

        b.addEventListener("mouseleave", function () {
          paint();
        });

        b.addEventListener("click", function () {
          s.level = n;
          paint();
          burst(5);
        });

        rate.appendChild(b);
      })(i);
    }

    paint();
    row.appendChild(rate);
    skillList.appendChild(row);
  });
}

// ==========================================================================
// 4. PROJECT SLIDER WITH TOUCH & KEYBOARD NAVIGATION
// ==========================================================================
var projects = [
  {
    title: "Personal Profile Web Page",
    tag: "HTML5 · CSS3 · Vanilla JS",
    text: "An interactive responsive profile featuring dark mode, dynamic skill ratings, interactive project carousel, and client-side contact validation for FT-WEB-101."
  },
  {
    title: "Online Coaching & Client Hub",
    tag: "Web Platform · Coaching",
    text: "A concept portal for fitness clients to monitor training schedules, nutrition milestones, progressive overload logs, and direct coach communication."
  },
  {
    title: "Algorithmic Problem Solver",
    tag: "C# · Python · Problem Solving",
    text: "A collection of clean, well-tested algorithms and data structures built during Computer Science coursework, focusing on efficiency and OOP principles."
  },
  {
    title: "Student Task & Study Dashboard",
    tag: "UI / UX · Productivity",
    text: "An organized dashboard concept tailored for university students to track course assignments, deadlines, GPA targets, and study sessions."
  }
];

var currentProjectIdx = 0;
var slideEl = document.getElementById("slide");
var dotsEl = document.getElementById("dots");
var sliderEl = document.querySelector(".slider");

if (dotsEl && slideEl) {
  projects.forEach(function (p, i) {
    var d = document.createElement("button");
    d.type = "button";
    d.setAttribute("role", "tab");
    d.setAttribute("aria-label", "Show project " + (i + 1) + ": " + p.title);
    d.addEventListener("click", function () {
      showProject(i);
    });
    dotsEl.appendChild(d);
  });
}

function showProject(i) {
  if (!slideEl || !dotsEl) return;
  currentProjectIdx = (i + projects.length) % projects.length;

  slideEl.style.animation = "none";
  void slideEl.offsetWidth; // Trigger reflow for animation restart
  slideEl.style.animation = "";

  var p = projects[currentProjectIdx];
  slideEl.innerHTML =
    "<h3>" + p.title + "</h3>" +
    "<span class=\"tag\">" + p.tag + "</span>" +
    "<p>" + p.text + "</p>";

  var dotButtons = dotsEl.querySelectorAll("button");
  dotButtons.forEach(function (d, n) {
    var isActive = n === currentProjectIdx;
    d.classList.toggle("on", isActive);
    d.setAttribute("aria-selected", isActive ? "true" : "false");
  });
}

var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");

if (prevBtn) {
  prevBtn.addEventListener("click", function () {
    showProject(currentProjectIdx - 1);
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", function () {
    showProject(currentProjectIdx + 1);
  });
}

// Keyboard arrow navigation on slider
if (sliderEl) {
  sliderEl.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      showProject(currentProjectIdx - 1);
    } else if (e.key === "ArrowRight") {
      showProject(currentProjectIdx + 1);
    }
  });
}

// Touch swipe gestures for mobile screens
var touchStartX = 0;
var touchEndX = 0;
if (sliderEl) {
  sliderEl.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderEl.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        showProject(currentProjectIdx + 1); // Swipe left -> Next
      } else {
        showProject(currentProjectIdx - 1); // Swipe right -> Prev
      }
    }
  }, { passive: true });
}

// Initialize slider with first project
showProject(0);

// ==========================================================================
// 5. ACTIVE TAB SCROLL SPY (INTERSECTION OBSERVER)
// ==========================================================================
var tabLinks = document.querySelectorAll(".tabbar a");
var trackedSections = document.querySelectorAll("header.hero, section.card");

if (typeof IntersectionObserver !== "undefined" && trackedSections.length > 0) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var targetId = entry.target.id;
        tabLinks.forEach(function (link) {
          var href = link.getAttribute("href");
          var isActive = href === "#" + targetId;
          link.classList.toggle("on", isActive);
        });
      }
    });
  }, {
    rootMargin: "-25% 0px -55% 0px"
  });

  trackedSections.forEach(function (sec) {
    observer.observe(sec);
  });
}

// ==========================================================================
// 6. CONTACT FORM VALIDATION & FEEDBACK
// ==========================================================================
var contactForm = document.getElementById("contactForm");
if (contactForm) {
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var msgInput = document.getElementById("message");
  var formMsg = document.getElementById("formMsg");

  function validateField(input, errId, condition, errMsg) {
    var errEl = document.getElementById(errId);
    if (!condition) {
      if (errEl) errEl.textContent = errMsg;
      input.classList.add("is-invalid");
      return false;
    } else {
      if (errEl) errEl.textContent = "";
      input.classList.remove("is-invalid");
      return true;
    }
  }

  // Clear errors in real-time as user types
  [nameInput, emailInput, msgInput].forEach(function (inp) {
    if (inp) {
      inp.addEventListener("input", function () {
        this.classList.remove("is-invalid");
        var errEl = document.getElementById(this.id + "Err");
        if (!errEl && this.id === "message") errEl = document.getElementById("msgErr");
        if (errEl) errEl.textContent = "";
      });
    }
  });

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var nameVal = nameInput ? nameInput.value.trim() : "";
    var emailVal = emailInput ? emailInput.value.trim() : "";
    var msgVal = msgInput ? msgInput.value.trim() : "";

    var isNameOk = validateField(nameInput, "nameErr", nameVal.length >= 2, "Please enter your name (at least 2 letters).");
    var isEmailOk = validateField(emailInput, "emailErr", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal), "Please enter a valid email address.");
    var isMsgOk = validateField(msgInput, "msgErr", msgVal.length >= 10, "Your message must be at least 10 characters long.");

    if (isNameOk && isEmailOk && isMsgOk) {
      if (formMsg) {
        formMsg.className = "form-feedback success";
        formMsg.textContent = "Thank you, " + nameVal + "! Your message was sent successfully 🚀";
      }
      contactForm.reset();
      burst(24);

      setTimeout(function () {
        if (formMsg) {
          formMsg.textContent = "";
          formMsg.className = "form-feedback";
        }
      }, 7000);
    } else {
      if (formMsg) {
        formMsg.className = "form-feedback";
        formMsg.textContent = "Please fix the highlighted fields above.";
      }
    }
  });
}
