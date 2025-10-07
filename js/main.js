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

// Scroll-spy for active navigation links
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main > section[id], footer[id]");
  const navLinks = document.querySelectorAll("header nav a");
  const mobileNavLinks = document.querySelectorAll("#mobile-menu nav a");

  // Combine both lists of links for easier processing
  const allLinks = [...navLinks, ...mobileNavLinks];

  const onScroll = () => {
    const scrollY = window.pageYOffset;
    let currentSectionId = "";

    // Find the current section in view
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150; // Offset to activate a bit earlier
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // Force activate contact section if at the bottom of the page
    if ((window.innerHeight + scrollY) >= document.documentElement.scrollHeight - 5) {
      currentSectionId = 'contact';
    }

    // Update the classes for all links
    allLinks.forEach(link => {
      const linkHref = link.getAttribute("href");
      
      if (linkHref.endsWith(`#${currentSectionId}`)) {
        // This is the active link
        link.classList.add("text-primary", "bg-primary-10");
        link.classList.remove("text-text-secondary", "hover:text-primary");
      } else {
        // This is an inactive link
        link.classList.remove("text-primary", "bg-primary-10");
        link.classList.add("text-text-secondary", "hover:text-primary");
      }
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll(); // Also run on load to set initial state
});