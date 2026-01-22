/* ================================================== */
/* MOBILE PAY APP - MAIN JAVASCRIPT                   */
/* ================================================== */

(function () {
  "use strict";

  /* ===== THEME MANAGEMENT ===== */
  const ThemeManager = {
    STORAGE_KEY: "mobile-pay-theme",

    // Get current theme from localStorage or default to 'light'
    getCurrentTheme: function () {
      return localStorage.getItem(this.STORAGE_KEY) || "light";
    },

    // Set theme and save to localStorage
    setTheme: function (theme) {
      document.documentElement.setAttribute("data-bs-theme", theme);
      localStorage.setItem(this.STORAGE_KEY, theme);
      this.updateThemeIcon(theme);
    },

    // Toggle between light and dark themes
    toggleTheme: function () {
      const currentTheme = this.getCurrentTheme();
      const newTheme = currentTheme === "light" ? "dark" : "light";
      this.setTheme(newTheme);
    },

    // Update the theme toggle button icon
    updateThemeIcon: function (theme) {
      const themeIcon = document.getElementById("theme-icon");
      if (themeIcon) {
        if (theme === "dark") {
          themeIcon.className = "bi bi-sun";
        } else {
          themeIcon.className = "bi bi-moon-stars";
        }
      }
    },

    // Initialize theme on page load
    init: function () {
      const savedTheme = this.getCurrentTheme();
      this.setTheme(savedTheme);

      // Add event listener to theme toggle button
      const themeToggle = document.getElementById("theme-toggle");
      if (themeToggle) {
        themeToggle.addEventListener("click", (e) => {
          e.preventDefault();
          this.toggleTheme();
        });
      }

      // Theme option cards (on settings page)
      document.querySelectorAll(".theme-option").forEach((card) => {
        card.addEventListener("click", function () {
          const theme = this.getAttribute("data-theme");

          // Remove active class from all cards
          document.querySelectorAll(".theme-option").forEach((c) => {
            c.classList.remove("active");
          });

          // Add active class to clicked card
          this.classList.add("active");

          // Apply theme
          if (theme === "auto") {
            // Auto theme: use system preference
            const prefersDark = window.matchMedia(
              "(prefers-color-scheme: dark)",
            ).matches;
            ThemeManager.setTheme(prefersDark ? "dark" : "light");
          } else {
            ThemeManager.setTheme(theme);
          }
        });
      });
    },
  };

  /* ===== PRELOADER / LOADING SPINNER ===== */
  const LoaderManager = {
    show: function () {
      const loader = document.getElementById("page-loader");
      if (loader) {
        loader.classList.remove("fade-out");
      }
    },

    hide: function () {
      const loader = document.getElementById("page-loader");
      if (loader) {
        loader.classList.add("fade-out");
        // Remove from DOM after animation completes
        setTimeout(() => {
          loader.style.display = "none";
        }, 300);
      }
    },
  };

  /* ===== NAVBAR SEARCH TOGGLE ===== */
  const NavbarSearch = {
    init: function () {
      const searchToggle = document.querySelector(
        '[data-widget="navbar-search"]',
      );
      const searchBlock = document.querySelector(".navbar-search-block");
      const searchClose = document.querySelector(
        '[data-widget="navbar-search"][type="button"]',
      );

      if (searchToggle && searchBlock) {
        searchToggle.addEventListener("click", (e) => {
          e.preventDefault();
          searchBlock.classList.toggle("show");

          // Focus on search input when opened
          if (searchBlock.classList.contains("show")) {
            const searchInput = searchBlock.querySelector("input");
            if (searchInput) {
              searchInput.focus();
            }
          }
        });
      }

      if (searchClose) {
        searchClose.addEventListener("click", () => {
          searchBlock.classList.remove("show");
        });
      }
    },
  };

  /* ===== LOGOUT HANDLER ===== */
  const LogoutHandler = {
    init: function () {
      const logoutButtons = document.querySelectorAll(
        "#logout-btn, #sidebar-logout-btn",
      );

      logoutButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();

          // Show confirmation dialog
          if (confirm("Are you sure you want to logout?")) {
            // Show loader
            LoaderManager.show();

            // Simulate logout process
            setTimeout(() => {
              alert("Logout successful! (This is a demo)");
              LoaderManager.hide();

              // In real app, redirect to login page:
              // window.location.href = './login.html';
            }, 1000);
          }
        });
      });
    },
  };

  /* ===== FORM VALIDATION ===== */
  const FormValidator = {
    init: function () {
      // Get all forms that need validation
      const forms = document.querySelectorAll("form");

      forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
          // Prevent default submission for demo
          e.preventDefault();

          // Check if form is valid
          if (form.checkValidity()) {
            // Show success message
            alert("Form submitted successfully! (This is a demo)");
          } else {
            // Show validation errors
            form.classList.add("was-validated");
          }
        });
      });
    },
  };

  /* ===== SIDEBAR TOGGLE FOR MOBILE ===== */
  const SidebarManager = {
    init: function () {
      const sidebarToggle = document.querySelector('[data-widget="pushmenu"]');

      if (sidebarToggle) {
        sidebarToggle.addEventListener("click", (e) => {
          e.preventDefault();
          document.body.classList.toggle("sidebar-open");
        });
      }

      // Close sidebar when clicking outside on mobile
      document.addEventListener("click", (e) => {
        const sidebar = document.querySelector(".main-sidebar");
        const isClickInsideSidebar = sidebar && sidebar.contains(e.target);
        const isToggleButton = e.target.closest('[data-widget="pushmenu"]');

        if (
          !isClickInsideSidebar &&
          !isToggleButton &&
          window.innerWidth <= 768
        ) {
          document.body.classList.remove("sidebar-open");
        }
      });
    },
  };

  /* ===== SMOOTH SCROLL TO TOP ===== */
  const ScrollManager = {
    init: function () {
      // Add scroll to top button
      const scrollBtn = document.createElement("button");
      scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
      scrollBtn.className = "btn btn-primary btn-scroll-top";
      scrollBtn.style.cssText =
        "position: fixed; bottom: 20px; right: 20px; z-index: 1000; border-radius: 50%; width: 50px; height: 50px; display: none;";
      document.body.appendChild(scrollBtn);

      // Show/hide scroll button based on scroll position
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          scrollBtn.style.display = "block";
        } else {
          scrollBtn.style.display = "none";
        }
      });

      // Scroll to top when clicked
      scrollBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    },
  };

  /* ===== INITIALIZATION ===== */
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Mobile Pay App - Initializing...");

    // Initialize all modules
    ThemeManager.init();
    NavbarSearch.init();
    LogoutHandler.init();
    FormValidator.init();
    SidebarManager.init();
    ScrollManager.init();

    // Hide loader after page fully loads
    window.addEventListener("load", () => {
      LoaderManager.hide();
    });

    // Also hide loader after 2 seconds as fallback
    setTimeout(() => {
      LoaderManager.hide();
    }, 2000);

    console.log("Mobile Pay App - Ready!");
  });

  /* ===== UTILITY FUNCTIONS ===== */
  window.MobilePayApp = {
    showLoader: LoaderManager.show.bind(LoaderManager),
    hideLoader: LoaderManager.hide.bind(LoaderManager),
    toggleTheme: ThemeManager.toggleTheme.bind(ThemeManager),
  };
})();
