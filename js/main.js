document.addEventListener('DOMContentLoaded', () => {
  const siteNavigation = document.getElementById('siteNavigation');
  const scrollThreshold = 30; // Píxeles de desplazamiento para activar el cambio

  if (!siteNavigation) return;

  const handleScroll = () => {
    const isScrolled = window.scrollY > scrollThreshold;
    siteNavigation.classList.toggle('scrolled', isScrolled);
  };

  handleScroll();

  window.addEventListener('scroll', handleScroll, { passive: true });
});

document.addEventListener("DOMContentLoaded", function () {
    const carouselEl = document.getElementById("reviewsVideoCarousel");
    if (!carouselEl || typeof bootstrap === "undefined") return;

    const nameBox = document.getElementById("testimonialNameBox");
    const carouselInstance = new bootstrap.Carousel(carouselEl, {
        interval: 4000,
        pause: false
    });

    carouselInstance.cycle();

    const videoContainers = carouselEl.querySelectorAll(".video-container");

    // Sincronizar el nombre al cambiar de slide
    carouselEl.addEventListener("slide.bs.carousel", function (event) {
        const activeItem = event.relatedTarget;
        if (activeItem && nameBox) {
            const personName = activeItem.getAttribute("data-name");
            if (personName) {
                nameBox.textContent = personName;     
            }
        }

        // Pausar y resetear videos previos al cambiar de slide
        videoContainers.forEach(container => {
            const video = container.querySelector(".testimonial-video");
            const posterImg = container.querySelector(".video-poster");
            const playOverlay = container.querySelector(".play-overlay");

            if (video && !video.classList.contains("d-none")) {
                video.pause();
                video.currentTime = 0;
                video.controls = false;
                video.classList.add("d-none");
                if (posterImg) posterImg.classList.remove("d-none");
                if (playOverlay) playOverlay.classList.remove("d-none");
            }
        });
        carouselInstance.cycle();
    });

    videoContainers.forEach(container => {
        const video = container.querySelector(".testimonial-video");
        const posterImg = container.querySelector(".video-poster");
        const playOverlay = container.querySelector(".play-overlay");
        const playBtn = container.querySelector(".play-btn");

        if (!video || !playOverlay) return;

        const startPlaying = (e) => {
            e.stopPropagation();
            carouselInstance.pause();

            if (posterImg) posterImg.classList.add("d-none");
            playOverlay.classList.add("d-none");

            video.classList.remove("d-none");
            video.controls = true;
            video.play().catch(err => console.error("Error al reproducir:", err));
        };

        if (playBtn) playBtn.addEventListener("click", startPlaying);
        playOverlay.addEventListener("click", startPlaying);

        video.addEventListener("ended", () => {
            video.pause();
            video.currentTime = 0;
            video.controls = false;
            video.classList.add("d-none");

            if (posterImg) posterImg.classList.remove("d-none");
            if (playOverlay) playOverlay.classList.remove("d-none");

            carouselInstance.cycle();
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const switchBtn = document.getElementById("newsletterSwitchBtn");
    if (!switchBtn) return;

    switchBtn.addEventListener("click", function () {
        const isActive = switchBtn.classList.toggle("active");
        switchBtn.setAttribute("aria-pressed", isActive ? "true" : "false");

        const label = switchBtn.querySelector(".switch-label");
        if (label) {
            label.textContent = isActive ? "Sent!" : "Submit";
        }
    });
});