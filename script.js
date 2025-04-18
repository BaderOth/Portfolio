const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navClose = document.getElementById('navClose');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
navClose.addEventListener('click', () => {
    navLinks.classList.remove('open');
});