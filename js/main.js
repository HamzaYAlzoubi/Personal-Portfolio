const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Typed.js initialization
var typed = new Typed('#typed-text', {
    strings: ["Building Modern Web Apps", "Front-end Developer", "Specialized in Next.js"],
    typeSpeed: 50,
    backSpeed: 25,
    loop: true,
    showCursor: true,
    cursorChar: '|',
});

// All page logic runs after the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  AOS.init();
  
  // --- Scroll-spy for active navigation links ---
  const sections = document.querySelectorAll("main > section[id], footer[id]");
  const navLinks = document.querySelectorAll("header nav a");
  const mobileNavLinks = document.querySelectorAll("#mobile-menu nav a");
  const allLinks = [...navLinks, ...mobileNavLinks];

  const onScroll = () => {
    const scrollY = window.pageYOffset;
    let currentSectionId = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (scrollY >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Force activate contact section if at the bottom of the page
    if ((window.innerHeight + scrollY) >= document.documentElement.scrollHeight - 5) {
      currentSectionId = 'contact';
    }

    allLinks.forEach(link => {
      const linkHref = link.getAttribute("href");
      
      if (linkHref.endsWith(`#${currentSectionId}`)) {
        link.classList.add("text-primary", "bg-primary-10");
        link.classList.remove("text-text-secondary", "hover:text-primary");
      } else {
        link.classList.remove("text-primary", "bg-primary-10");
        link.classList.add("text-text-secondary", "hover:text-primary");
      }
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll(); // Also run on load to set initial state
});
