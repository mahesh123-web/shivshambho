// ============================================
// CERAMIC COATING STUDIO — Client-Side JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- Mobile menu toggle ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Scroll reveal animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const targetId = href.startsWith('/#') ? href.substring(1) : href;

            // If we're on a different page and the link starts with /#, let the browser navigate
            if (href.startsWith('/#') && window.location.pathname !== '/') {
                return;
            }

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // --- Form submissions ---
    // Booking Form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await submitForm(bookingForm, '/api/bookings', 'bookingFeedback', 'bookingSubmit');
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await submitForm(contactForm, '/api/contact', 'contactFeedback', 'contactSubmit');
        });
    }

    // --- Package sub-options toggle ---
    document.querySelectorAll('.package-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.package-card');
            const panel = card.querySelector('.sub-options-panel');
            const isOpen = panel.classList.contains('open');

            // Close all other panels first
            document.querySelectorAll('.sub-options-panel.open').forEach(p => {
                p.classList.remove('open');
                p.closest('.package-card').querySelector('.package-toggle-btn').classList.remove('active');
                p.closest('.package-card').querySelector('.btn-text-toggle').textContent = 'View Options';
            });

            // Toggle current panel
            if (!isOpen) {
                panel.classList.add('open');
                btn.classList.add('active');
                btn.querySelector('.btn-text-toggle').textContent = 'Hide Options';
            }
        });
    });

    // --- URL query param: pre-select package & vehicle type ---
    const urlParams = new URLSearchParams(window.location.search);
    const packageParam = urlParams.get('package');
    if (packageParam) {
        const packageSelect = document.getElementById('package_id');
        if (packageSelect) {
            packageSelect.value = packageParam;
        }
    }

    const vehicleParam = urlParams.get('vehicle');
    if (vehicleParam) {
        const vehicleSelect = document.getElementById('vehicle_type');
        if (vehicleSelect) {
            vehicleSelect.value = vehicleParam;
        }
    }

    // Set min date for booking date input
    const dateInput = document.getElementById('preferred_date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// --- Generic form submission handler ---
async function submitForm(form, url, feedbackId, submitBtnId) {
    const feedback = document.getElementById(feedbackId);
    const submitBtn = document.getElementById(submitBtnId);
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    // Show loading
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoader) btnLoader.style.display = 'inline';

    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        feedback.textContent = result.message;
        feedback.className = 'form-feedback ' + (result.success ? 'success' : 'error');

        if (result.success) {
            form.reset();
        }
    } catch (error) {
        feedback.textContent = 'Something went wrong. Please try again or call us directly.';
        feedback.className = 'form-feedback error';
    } finally {
        submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'inline';
        if (btnLoader) btnLoader.style.display = 'none';
    }
}
