(function () {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("jobhunt-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    root.classList.add("dark");
  }

  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function updateThemeIcon() {
    const isDark = root.classList.contains("dark");
    document.querySelectorAll(".theme-sun").forEach((icon) => {
      icon.classList.toggle("hidden", isDark);
    });
    document.querySelectorAll(".theme-moon").forEach((icon) => {
      icon.classList.toggle("hidden", !isDark);
    });
  }

  document.querySelectorAll("#themeToggle").forEach((button) => {
    button.addEventListener("click", () => {
      root.classList.toggle("dark");
      localStorage.setItem(
        "jobhunt-theme",
        root.classList.contains("dark") ? "dark" : "light",
      );
      updateThemeIcon();
    });
  });

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  menuToggle?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("hidden");
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item?.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        openItem.classList.remove("open");
      });

      if (!isOpen) {
        item?.classList.add("open");
      }
    });
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const view = tab.getAttribute("data-view");

      document.querySelectorAll(".tab").forEach((button) => {
        button.classList.remove("active");
      });
      tab.classList.add("active");

      document.querySelectorAll(".screen-panel").forEach((panel) => {
        panel.classList.remove("visible");
      });

      document.getElementById(`${view}-view`)?.classList.add("visible");
    });
  });

  document.querySelectorAll(".feature-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const feature = tab.getAttribute("data-feature");

      document.querySelectorAll(".feature-tab").forEach((button) => {
        button.classList.toggle("active", button === tab);
      });

      document.querySelectorAll(".feature-tab-panel").forEach((panel) => {
        panel.classList.toggle(
          "active",
          panel.getAttribute("data-feature-panel") === feature,
        );
      });
    });
  });

  const form = document.getElementById("waitlistForm");
  const emailInput = document.getElementById("emailInput");
  const formMessage = document.getElementById("formMessage");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const existing = JSON.parse(
      localStorage.getItem("jobhunt-waitlist") || "[]",
    );

    if (!existing.includes(email)) {
      existing.push(email);
      localStorage.setItem("jobhunt-waitlist", JSON.stringify(existing));
    }

    form.reset();
    formMessage.textContent =
      "You're on the beta list. We'll be in touch soon.";
  });

  updateThemeIcon();
  refreshIcons();
})();
