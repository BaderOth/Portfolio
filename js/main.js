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
});
