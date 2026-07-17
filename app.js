/* ==========================================
   AOS INIT
========================================== */

AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

/* ==========================================
   TYPING EFFECT
========================================== */

const words = [
    "PPIC Specialist",
    "Inventory Controller",
    "Delivery Planner",
    "Continuous Improvement"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex);

        charIndex++;

        if (charIndex > currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex);

        charIndex--;

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 60 : 120
    );
}

typeEffect();

/* ==========================================
   HERO GSAP ANIMATION
========================================== */

window.addEventListener("load", () => {

    gsap.from(".hero-text h4", {
        y: 30,
        opacity: 0,
        duration: 1
    });

    gsap.from(".hero-text h1", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: .2
    });

    gsap.from(".hero-text h2", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: .4
    });

    gsap.from(".hero-text p", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: .6
    });

    gsap.from(".hero-buttons", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: .8
    });

    gsap.from(".hero-image", {
        x: 100,
        opacity: 0.5,
        duration: 1.2,
        delay: .4
    });

});

/* ==========================================
   COUNTER ANIMATION
========================================== */

const counters =
    document.querySelectorAll(".counter");

const counterObserver =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target =
            +counter.getAttribute("data-target");

            let current = 0;

            const increment =
            target / 100;

            const updateCounter = () => {

                if (current < target) {

                    current += increment;

                    counter.innerText =
                    Math.ceil(current);

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    const label =
counter.nextElementSibling.innerText;

if(label.includes("Experience")){
    counter.innerText = target + "+";
}else{
    counter.innerText = target + "%";
}

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

/* ==========================================
   PARTICLES JS
========================================== */

particlesJS("particles-js", {

    particles: {

        number: {
            value: 80
        },

        color: {
            value: "#8b5cf6"
        },

        shape: {
            type: "circle"
        },

        opacity: {
            value: 0.4
        },

        size: {
            value: 3
        },

        move: {
            enable: true,
            speed: 1
        }

    },

    interactivity: {

        events: {

            onhover: {
                enable: true,
                mode: "grab"
            }

        }

    }

});

/* ==========================================
   PORTFOLIO FILTER
========================================== */

const filterButtons =
document.querySelectorAll(
".filter-buttons button"
);

const portfolioCards =
document.querySelectorAll(
".portfolio-card"
);

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
        button.dataset.filter;

        portfolioCards.forEach(card => {

            if (
                filter === "all" ||
                card.classList.contains(filter)
            ) {

                card.style.display = "block";

                setTimeout(() => {

                    card.style.opacity = "1";
                    card.style.transform =
                    "scale(1)";

                }, 100);

            } else {

                card.style.opacity = "0";

                card.style.transform =
                "scale(.8)";

                setTimeout(() => {

                    card.style.display = "none";

                }, 300);

            }

        });

    });

});

/* ==========================================
   DARK / LIGHT MODE + LOCALSTORAGE
========================================== */

const themeToggle =
document.querySelector(".theme-toggle");

// Cek preferensi tersimpan atau preferensi sistem
function getInitialTheme() {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "light";

    // Deteksi prefers-color-scheme
    return window.matchMedia && 
           window.matchMedia("(prefers-color-scheme: light)").matches;
}

// Apply tema
function applyTheme(isLight) {
    if (isLight) {
        document.body.classList.add("light-theme");
    } else {
        document.body.classList.remove("light-theme");
    }
    updateThemeIcon(isLight);
}

// Update icon
function updateThemeIcon(isLight) {
    const icon = themeToggle.querySelector("i");
    if (isLight) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

// Inisialisasi tema saat load
applyTheme(getInitialTheme());

// Listener untuk toggle
themeToggle.addEventListener("click", () => {

    const isLight = document.body.classList.toggle("light-theme");

    localStorage.setItem("theme", isLight ? "light" : "dark");

    updateThemeIcon(isLight);

});

// Listener untuk perubahan prefers-color-scheme
window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
    // Hanya apply jika user belum pernah set manual (tidak ada localStorage)
    if (!localStorage.getItem("theme")) {
        applyTheme(e.matches);
    }
});

/* ==========================================
   MOBILE MENU
========================================== */

const mobileBtn =
document.querySelector(
".mobile-menu-btn"
);

const sidebar =
document.querySelector(
".sidebar"
);

mobileBtn.addEventListener("click", () => {

    sidebar.classList.toggle("active");

});

// Keyboard support untuk mobile menu
mobileBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        sidebar.classList.toggle("active");
    }
});

/* ==========================================
   ACTIVE MENU ON SCROLL
========================================== */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(
".sidebar nav a"
);

function updateActiveNav() {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (
            pageYOffset >= sectionTop
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href")
            .includes(current)
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNav);

/* ==========================================
   SMOOTH SCROLL
========================================== */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
        "click",
        function (e) {

            const href = this.getAttribute("href");

            // Abaikan placeholder link
            if (href === "#") return;

            e.preventDefault();

            const target =
            document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }

            // Tutup menu mobile setelah klik
            sidebar.classList.remove("active");

        }
    );

});

/* ==========================================
   NAVBAR GLOW EFFECT
========================================== */

function updateNavbarGlow() {

    if (window.scrollY > 50) {

        sidebar.style.boxShadow =
        "0 0 30px rgba(139,92,246,.4)";

    } else {

        sidebar.style.boxShadow =
        "0 0 15px rgba(139,92,246,.15)";

    }

}

window.addEventListener("scroll", updateNavbarGlow);

/* ==========================================
   FLOATING ANIMATION
========================================== */

gsap.to(".image-wrapper", {

    y: -15,

    repeat: -1,

    yoyo: true,

    duration: 2,

    ease: "power1.inOut"

});

/* ==========================================
   TOAST NOTIFICATION SYSTEM
========================================== */

function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const icons = {
        success: "fa-circle-check",
        error: "fa-circle-xmark",
        info: "fa-circle-info"
    };

    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    // Auto remove
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
}

/* ==========================================
   FORM VALIDATION
========================================== */

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(form) {
    let isValid = true;

    const name = form.querySelector('[name="user_name"]');
    const email = form.querySelector('[name="user_email"]');
    const message = form.querySelector('[name="message"]');

    // Reset errors
    [name, email, message].forEach(field => {
        field.classList.remove("error");
        const errorEl = document.getElementById(`error-${field.name.replace("user_", "")}`);
        if (errorEl) errorEl.textContent = "";
    });

    // Validate name
    if (!name.value.trim() || name.value.trim().length < 2) {
        name.classList.add("error");
        document.getElementById("error-name").textContent = "Nama minimal 2 karakter";
        isValid = false;
    }

    // Validate email
    if (!email.value.trim()) {
        email.classList.add("error");
        document.getElementById("error-email").textContent = "Email wajib diisi";
        isValid = false;
    } else if (!validateEmail(email.value.trim())) {
        email.classList.add("error");
        document.getElementById("error-email").textContent = "Format email tidak valid";
        isValid = false;
    }

    // Validate message
    if (!message.value.trim() || message.value.trim().length < 10) {
        message.classList.add("error");
        document.getElementById("error-message").textContent = "Pesan minimal 10 karakter";
        isValid = false;
    }

    return isValid;
}

/* ==========================================
   CONTACT FORM — EMAILJS
========================================== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    // Real-time validation
    contactForm.querySelectorAll("input, textarea").forEach(field => {
        field.addEventListener("blur", () => {
            validateForm(contactForm);
        });
        field.addEventListener("input", () => {
            if (field.classList.contains("error")) {
                validateForm(contactForm);
            }
        });
    });

    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Validasi custom
        if (!validateForm(this)) {
            showToast("Silakan perbaiki error pada form", "error");
            return;
        }

        const btn = this.querySelector("button[type='submit']");
        const btnText = btn.querySelector(".btn-text");
        const originalText = btnText.innerText;

        // Loading state
        btnText.innerText = "Mengirim...";
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span class="btn-text">Mengirim...</span>';

        emailjs.sendForm(
            "service_cmws6of",   // Service ID
            "template_n2izahw",  // Template ID
            this
        )
        .then(function() {
            showToast("✅ Pesan berhasil dikirim! Saya akan membalas secepatnya.", "success");
            contactForm.reset();
            // Clear error states
            contactForm.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
            contactForm.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
        })
        .catch(function(error) {
            showToast("❌ Gagal mengirim pesan. Silakan coba lagi atau hubungi langsung via WhatsApp.", "error");
            console.error("EmailJS Error:", error);
        })
        .finally(function() {
            btn.disabled = false;
            btn.innerHTML = `<i class="fas fa-paper-plane"></i> <span class="btn-text">${originalText}</span>`;
        });
    });
}

/* ==========================================
   IMAGE ERROR HANDLING
========================================== */

document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", function() {
        this.style.display = "none";
        const placeholder = document.createElement("div");
        placeholder.className = "img-placeholder";
        placeholder.innerHTML = '<i class="fas fa-image" style="font-size:48px;color:var(--text-muted)"></i>';
        placeholder.style.cssText = "width:100%;height:200px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);border-radius:15px;";
        this.parentNode.insertBefore(placeholder, this);
    });
});

/* ==========================================
   CDN FALLBACK CHECK
========================================== */

function checkCDNFallbacks() {
    // Check GSAP
    if (typeof gsap === "undefined") {
        console.warn("GSAP tidak dimuat. Animasi akan dinonaktifkan.");
        // Disable GSAP-dependent animations
        document.querySelectorAll("[data-aos]").forEach(el => {
            el.removeAttribute("data-aos");
        });
    }

    // Check AOS
    if (typeof AOS === "undefined") {
        console.warn("AOS tidak dimuat. Scroll animations dinonaktifkan.");
    }

    // Check Particles
    if (typeof particlesJS === "undefined") {
        console.warn("Particles.js tidak dimuat. Background particles dinonaktifkan.");
        const particlesContainer = document.getElementById("particles-js");
        if (particlesContainer) {
            particlesContainer.style.background = "linear-gradient(135deg, var(--bg), var(--bg2))";
        }
    }

    // Check EmailJS
    if (typeof emailjs === "undefined") {
        console.warn("EmailJS tidak dimuat. Form kontak akan dinonaktifkan.");
        const form = document.getElementById("contact-form");
        if (form) {
            form.innerHTML = `
                <div style="text-align:center;padding:40px;">
                    <i class="fas fa-triangle-exclamation" style="font-size:48px;color:var(--warning);margin-bottom:20px;display:block;"></i>
                    <p style="color:var(--text-muted);">Maaf, layanan kontak sedang tidak tersedia.</p>
                    <p style="color:var(--text-muted);margin-top:10px;">Silakan hubungi langsung via WhatsApp atau Email.</p>
                </div>
            `;
        }
    }
}

// Run check after a short delay to allow CDN scripts to load
setTimeout(checkCDNFallbacks, 3000);