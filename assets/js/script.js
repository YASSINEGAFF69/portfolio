'use strict';

// ------------------ ELEMENT TOGGLE FUNCTION ------------------ //
const elementToggleFunc = (elem) => {
  if (elem) elem.classList.toggle("active");
};

// ------------------ SIDEBAR ------------------ //
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
}

// Make sidebar active by default on mobile
const sidebarBreakpoint = 1200; // adjust as needed
const updateSidebarState = () => {
  if (!sidebar) return;
  if (window.innerWidth <= sidebarBreakpoint) {
    sidebar.classList.add("active");
  } else {
    sidebar.classList.remove("active");
  }
};

// Initialize sidebar state
updateSidebarState();
// Optional: update on window resize
window.addEventListener("resize", updateSidebarState);

// ------------------ TESTIMONIALS MODAL ------------------ //
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = () => {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
};

// Open modal on testimonial click
testimonialsItem.forEach((item) => {
  item.addEventListener("click", () => {
    const avatar = item.querySelector("[data-testimonials-avatar]");
    const title = item.querySelector("[data-testimonials-title]");
    const text = item.querySelector("[data-testimonials-text]");

    if (avatar && modalImg) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    if (title && modalTitle) modalTitle.innerHTML = title.innerHTML;
    if (text && modalText) modalText.innerHTML = text.innerHTML;

    testimonialsModalFunc();
  });
});

// Close modal
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

// ------------------ CUSTOM SELECT & FILTER ------------------ //
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// Toggle select dropdown
if (select) {
  select.addEventListener("click", () => elementToggleFunc(select));
}

// Filter function
const filterFunc = (selectedValue) => {
  filterItems.forEach((item) => {
    const categories = item.dataset.category
      ? item.dataset.category.toLowerCase().split(",").map(c => c.trim())
      : [];
    if (selectedValue === "all" || categories.includes(selectedValue)) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Select dropdown item click
selectItems.forEach((item) => {
  item.addEventListener("click", () => {
    const value = item.innerText.toLowerCase().trim();
    if (selectValue) selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterFunc(value);
  });
});

// Filter button click
let lastClickedBtn = filterBtn[0];
filterBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove active from all
    filterBtn.forEach(b => b.classList.remove("active"));
    this.classList.add("active");

    const value = this.innerText.toLowerCase().trim();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(value);

    lastClickedBtn = this;
  });
});

// ------------------ CONTACT FORM ------------------ //
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (form && form.checkValidity()) {
      if (formBtn) formBtn.removeAttribute("disabled");
    } else {
      if (formBtn) formBtn.setAttribute("disabled", "");
    }
  });
});

// ------------------ PAGE NAVIGATION ------------------ //
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Remove active from all pages & links first
    pages.forEach((page) => page.classList.remove("active"));
    navigationLinks.forEach((nav) => nav.classList.remove("active"));

    // Activate the page that matches the link
    pages.forEach((page) => {
      if (link.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
      }
    });

    // Activate clicked link
    link.classList.add("active");

    // Scroll to top
    window.scrollTo(0, 0);
  });
});

// ------------------ SLIDER INIT ------------------ //
function initSliders() {
  document.querySelectorAll(".blog-post-item").forEach((blogItem) => {
    const slides = blogItem.querySelectorAll(".slide");
    const btnPrev = blogItem.querySelector(".prev");
    const btnNext = blogItem.querySelector(".next");
    const dotsContainer = blogItem.querySelector(".dots-container");
    const dots = dotsContainer ? dotsContainer.querySelectorAll(".dot") : [];
    let currentSlide = 0;

    if (slides.length === 0) return; // no slides, skip

    const updateSlider = () => {
      slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;

        const video = slide.querySelector("video");
        if (video) {
          if (i === currentSlide) {
            video.muted = false;
            video.play().catch(() => {});
          } else {
            video.muted = true;
            video.pause();
          }
        }
      });

      if (dots.length > 0) {
        dots.forEach((dot) => dot.classList.remove("active"));
        if (dots[currentSlide]) dots[currentSlide].classList.add("active");
      }
    };

    if (btnNext) btnNext.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    });

    if (btnPrev) btnPrev.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    });

    if (dots.length > 0) {
      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          currentSlide = i;
          updateSlider();
        });
      });
    }

    updateSlider(); // initialize
  });
}

initSliders();
