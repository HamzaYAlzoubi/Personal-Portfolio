const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Typed.js initialization
var typed = new Typed('#typed-text', {
    strings: ["Building Modern Web Apps", "Full Stack Developer", "Freelancer"],
    typeSpeed: 50,
    backSpeed: 25,
    loop: true,
    showCursor: true,
    cursorChar: '|',
});