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

  // --- Custom Lightbox Logic ---
  const lightbox = document.getElementById('custom-lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const thumbnailsContainer = document.getElementById('lightbox-thumbnails-container');
  const closeButton = lightbox.querySelector('.lightbox-close');
  const nextButton = lightbox.querySelector('.lightbox-next');
  const prevButton = lightbox.querySelector('.lightbox-prev');
  const projectItems = document.querySelectorAll('.project-item');

  let galleryImages = [];
  let currentImageIndex = 0;

  const generateThumbnails = () => {
    thumbnailsContainer.innerHTML = ''; // Clear old thumbnails
    galleryImages.forEach((imageSrc, index) => {
      const thumb = document.createElement('img');
      thumb.src = imageSrc;
      thumb.classList.add('thumbnail-image');
      thumb.dataset.index = index;
      // Add click listener to change image
      thumb.addEventListener('click', (e) => {
        currentImageIndex = parseInt(e.target.dataset.index);
        updateLightboxImage();
      });
      thumbnailsContainer.appendChild(thumb);
    });
  };

  const openLightbox = (images, index) => {
    galleryImages = images;
    currentImageIndex = index;
    generateThumbnails();
    updateLightboxImage();
    lightbox.classList.add('visible');
    lightbox.classList.remove('hidden');
  };

  const closeLightbox = () => {
    lightbox.classList.remove('visible');
    lightbox.classList.add('hidden');
  };

  const updateLightboxImage = () => {
    // Update main image
    if (galleryImages.length > 0) {
      lightboxImage.src = galleryImages[currentImageIndex];
    }

    // Update thumbnails active state
    const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnail-image');
    thumbnails.forEach(thumb => {
      if (parseInt(thumb.dataset.index) === currentImageIndex) {
        thumb.classList.add('active');
        // Scroll the active thumbnail into view
        thumb.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      } else {
        thumb.classList.remove('active');
      }
    });

    // Hide/show arrows and thumbnails if only one image
    const navigationVisible = galleryImages.length > 1;
    nextButton.style.display = navigationVisible ? 'block' : 'none';
    prevButton.style.display = navigationVisible ? 'block' : 'none';
    thumbnailsContainer.style.display = navigationVisible ? 'block' : 'none';
  };

  const showNextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
  };

  const showPrevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
  };

  projectItems.forEach(item => {
    item.addEventListener('click', () => {
      const imagesAttr = item.dataset.galleryImages;
      if (imagesAttr) {
        const images = imagesAttr.split(',').map(s => s.trim());
        if (images.length > 0) {
          openLightbox(images, 0);
        }
      }
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);
  nextButton.addEventListener('click', showNextImage);
  prevButton.addEventListener('click', showPrevImage);

  window.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('visible')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      }
    }
  });
  // --- Click to Copy Email ---
  const emailButtons = document.querySelectorAll('[data-copy-email]');
  emailButtons.forEach(button => {
    const tooltip = button.parentElement.querySelector('.email-tooltip');
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const email = button.dataset.copyEmail;
      if (email) {
        navigator.clipboard.writeText(email).then(() => {
          // Show tooltip
          if (tooltip) {
            tooltip.style.opacity = '1';
            setTimeout(() => {
              tooltip.style.opacity = '0';
            }, 2000); // Hide after 2 seconds
          }
        }).catch(err => {
          console.error('Failed to copy email: ', err);
        });
      }
    });
  });
});
