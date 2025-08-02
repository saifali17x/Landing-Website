// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar scroll effects
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const scrolled = window.scrollY;

  if (scrolled > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
    navbar.style.backdropFilter = "blur(20px)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
    navbar.style.backdropFilter = "blur(10px)";
  }
});

// Contact form submission handler
document
  .querySelector(".contact-form form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name =
      formData.get("name") ||
      this.querySelector('input[placeholder="Name"]').value;
    const email =
      formData.get("email") ||
      this.querySelector('input[placeholder="Email"]').value;
    const message =
      formData.get("message") ||
      this.querySelector('textarea[placeholder="Message"]').value;

    // Simple validation
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Simulate form submission
    const submitBtn = this.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.");
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });

// Newsletter form submission handler
document
  .querySelector(".newsletter-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Simulate subscription
    const submitBtn = this.querySelector("button");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Subscribing...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert(
        "Thank you for subscribing to LifeNotes! Check your email for confirmation."
      );
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      // Optional: unobserve after animation to improve performance
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Elements to animate on scroll
  const animatedElements = document.querySelectorAll(`
        .social-card, 
        .creative-card, 
        .value-item, 
        .feature,
        .hero-text,
        .hero-image,
        .about-images,
        .about-text,
        .capsule-image,
        .capsule-text,
        .newsletter-content
    `);

  // Add initial styles and observe elements
  animatedElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
});

// Add CSS for animation class
const style = document.createElement("style");
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Hover effects for cards */
    .social-card:hover,
    .creative-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    }
    
    .value-item:hover .value-icon {
        transform: scale(1.1);
        background: var(--congress-blue);
        color: var(--white);
        border-color: var(--congress-blue);
    }
    
    /* Button hover effects */
    .cta-button:hover {
        background: var(--tapa);
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 8px 25px rgba(122, 106, 83, 0.4);
    }
    
    /* Smooth transitions for all interactive elements */
    .social-card,
    .creative-card,
    .value-item,
    .cta-button,
    .newsletter-form button,
    .submit-btn,
    .social-links a {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Loading states */
    .loading {
        position: relative;
        pointer-events: none;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Parallax effect for hero section */
    @media (min-width: 768px) {
        .hero-circle {
            transform: translateZ(0);
            will-change: transform;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section (desktop only)
if (window.innerWidth > 768) {
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroCircle = document.querySelector(".hero-circle");

    if (heroCircle) {
      const translateY = scrolled * 0.3;
      heroCircle.style.transform = `translateY(${translateY}px)`;
    }
  });
}

// Preload images for better performance
function preloadImages() {
  const images = [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
    "https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7",
    "https://images.unsplash.com/photo-1611695434398-4f4b330623e6",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
  ];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize preloading
preloadImages();

// Add keyboard navigation support
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    // Close any open modals or overlays
    document.activeElement.blur();
  }

  if (e.key === "Tab") {
    // Ensure proper tab navigation
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", function () {
  document.body.classList.remove("keyboard-navigation");
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement("style");
focusStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--congress-blue);
        outline-offset: 2px;
    }
    
    .keyboard-navigation .nav-links a:focus,
    .keyboard-navigation .cta-button:focus,
    .keyboard-navigation .newsletter-form button:focus,
    .keyboard-navigation .submit-btn:focus {
        outline: 2px solid var(--ripe-lemon);
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", function () {
    setTimeout(function () {
      const perfData = performance.getEntriesByType("navigation")[0];
      const loadTime = perfData.loadEventEnd - perfData.loadEventStart;

      if (loadTime > 3000) {
        console.warn(
          "Page load time is higher than expected:",
          loadTime + "ms"
        );
      } else {
        console.log("Page loaded successfully in", loadTime + "ms");
      }
    }, 0);
  });
}
