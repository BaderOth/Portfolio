// Handle mobile menu toggle and smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    navToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        navToggle.classList.toggle('open');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        navToggle.classList.remove('open');
    });

    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            navToggle.classList.remove('open');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer for triggering animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.card, .profile-img, .btn, .contact-form input, .contact-form textarea').forEach(el => {
        observer.observe(el);
    });

    // Personality traits animation
    const traitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const traitLevels = entry.target.querySelectorAll('.trait-level');
                traitLevels.forEach(level => {
                    const width = level.style.width;
                    level.style.width = '0';
                    setTimeout(() => {
                        level.style.width = width;
                    }, 100);
                });
            }
        });
    }, {
        threshold: 0.5
    });

    document.querySelectorAll('.personality-card').forEach(card => {
        traitObserver.observe(card);
    });

    // Image modal
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.modal .close');

    document.querySelectorAll('.visual-item img').forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.src;
            captionText.innerHTML = img.alt;
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-container a, .sidebar a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Loading state
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const formStatus = document.getElementById('formStatus');
        formStatus.style.display = 'none';

        emailjs.sendForm('service_et1qpvl', 'template_475p6u9', this, 'AmnyTa_x_bDUmGOB0')
            .then(() => {
                formStatus.style.display = 'block';
                formStatus.textContent = 'Message sent successfully!';
                formStatus.style.color = 'green';
                this.reset();
            })
            .catch((error) => {
                formStatus.style.display = 'block';
                formStatus.textContent = 'Failed to send message. Please try again later.';
                formStatus.style.color = 'red';
                console.error('EmailJS Error:', error); // Logs the error details
            });
    });
});