document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Elements
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');
    const fadeElements = document.querySelectorAll('.fade-up');

    // Sticky Header
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    // Mobile Menu Toggle
    const toggleMenu = () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenu.classList.contains('active') ? 'x' : 'menu';
        mobileToggle.innerHTML = `<i data-lucide="${icon}"></i>`;
        lucide.createIcons();
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close Mobile Menu on Link Click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // Form Submission Handling (Prevent Default)
    const form = document.getElementById('inquiryForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            // Simulating a sending state
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                btn.textContent = 'Inquiry Sent Successfully';
                btn.style.backgroundColor = '#10B981'; // Success Green
                btn.style.color = '#FFFFFF';
                form.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style = ''; // Reset inline styles
                }, 3000);
            }, 1500);
        });
    }
});