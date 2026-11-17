document.documentElement.dataset.page = "clipping-path";

(() => {
  "use strict";

  // Hero example carousel.
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const images = [...carousel.querySelectorAll(".cp-carousel-image")];
    const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
    const frame = carousel.querySelector(".cp-carousel-frame");
    const previous = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    let active = 0;
    let timer = 0;

    if (!images.length) return;

    const show = (index) => {
      active = (index + images.length) % images.length;
      images.forEach((image, i) => image.classList.toggle("is-active", i === active));
      dots.forEach((dot, i) => {
        const current = i === active;
        dot.classList.toggle("is-active", current);
        if (current) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };
    const stop = () => window.clearInterval(timer);
    const start = () => {
      stop();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        timer = window.setInterval(() => show(active + 1), 4500);
      }
    };
    const move = (index) => { show(index); start(); };

    previous?.addEventListener("click", () => move(active - 1));
    next?.addEventListener("click", () => move(active + 1));
    dots.forEach((dot) => dot.addEventListener("click", () => move(Number(dot.dataset.carouselDot))));
    frame?.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;
      const rect = frame.getBoundingClientRect();
      images[active].style.setProperty("--zoom-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      images[active].style.setProperty("--zoom-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    });
    frame?.addEventListener("pointerleave", () => {
      images[active].style.setProperty("--zoom-x", "50%");
      images[active].style.setProperty("--zoom-y", "50%");
    });
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", (event) => {
      if (!carousel.contains(event.relatedTarget)) start();
    });
    show(0);
    start();
  });

  // Clipping project gallery with manual controls and pointer zoom.
  document.querySelectorAll("[data-project-gallery]").forEach((gallery) => {
    const stage = gallery.querySelector("[data-project-stage]");
    const pane = gallery.querySelector(".cp-project-pane");
    const image = gallery.querySelector("[data-project-image]");
    const thumbs = [...gallery.querySelectorAll("[data-project-thumb]")];
    const previous = gallery.querySelector("[data-project-prev]");
    const next = gallery.querySelector("[data-project-next]");
    const projects = thumbs.map((thumb) => {
      const thumbImage = thumb.querySelector("img");
      return { src: thumbImage?.getAttribute("src"), alt: thumbImage?.alt || "Clipping path project" };
    }).filter((project) => project.src);
    let active = 0;
    let loopTimer = 0;

    if (!stage || !pane || !image || !projects.length) return;

    const show = (index) => {
      active = (index + projects.length) % projects.length;
      const project = projects[active];
      pane.classList.add("is-changing");
      const preload = new Image();
      preload.onload = () => {
        image.src = project.src;
        image.alt = project.alt;
        pane.classList.remove("is-changing");
      };
      preload.onerror = () => {
        image.src = project.src;
        image.alt = project.alt;
        pane.classList.remove("is-changing");
      };
      preload.src = project.src;
      thumbs.forEach((thumb, i) => {
        const current = i === active;
        thumb.classList.toggle("is-active", current);
        if (current) thumb.setAttribute("aria-current", "true");
        else thumb.removeAttribute("aria-current");
      });
    };

    const stopLoop = () => window.clearInterval(loopTimer);
    const startLoop = () => {
      stopLoop();
      if (projects.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        loopTimer = window.setInterval(() => show(active + 1), 3500);
      }
    };
    const selectProject = (index) => { show(index); startLoop(); };

    previous?.addEventListener("click", () => selectProject(active - 1));
    next?.addEventListener("click", () => selectProject(active + 1));
    thumbs.forEach((thumb) => thumb.addEventListener("click", () => selectProject(Number(thumb.dataset.projectThumb))));
    gallery.addEventListener("mouseenter", stopLoop);
    gallery.addEventListener("mouseleave", startLoop);
    gallery.addEventListener("focusin", stopLoop);
    gallery.addEventListener("focusout", (event) => {
      if (!gallery.contains(event.relatedTarget)) startLoop();
    });
    stage.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse") return;
      stage.classList.add("is-zooming");
    });
    stage.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;
      const rect = stage.getBoundingClientRect();
      stage.style.setProperty("--project-zoom-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      stage.style.setProperty("--project-zoom-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    });
    stage.addEventListener("pointerleave", () => {
      stage.classList.remove("is-zooming");
      stage.style.setProperty("--project-zoom-x", "50%");
      stage.style.setProperty("--project-zoom-y", "50%");
    });
    show(0);
    startLoop();
  });

  // Keyboard accessible expandable information and pricing sections.
  document.querySelectorAll("[data-accordion]").forEach((accordion) => {
    const toggle = accordion.querySelector(".cp-faq-toggle");
    const content = accordion.querySelector(".cp-faq-content");
    if (!toggle || !content) return;

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      const shouldOpen = !expanded;
      const currentHeight = content.hidden ? 0 : content.getBoundingClientRect().height;
      const currentOpacity = content.hidden ? 0 : Number.parseFloat(getComputedStyle(content).opacity);
      content.getAnimations().forEach((animation) => animation.cancel());

      toggle.setAttribute("aria-expanded", String(shouldOpen));
      content.hidden = false;
      content.style.overflow = "hidden";
      content.style.height = `${currentHeight}px`;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        content.hidden = !shouldOpen;
        content.style.removeProperty("height");
        content.style.removeProperty("overflow");
        return;
      }

      const targetHeight = shouldOpen ? content.scrollHeight : 0;
      const animation = content.animate(
        [
          { height: `${currentHeight}px`, opacity: Number.isFinite(currentOpacity) ? currentOpacity : (shouldOpen ? 0 : 1) },
          { height: `${targetHeight}px`, opacity: shouldOpen ? 1 : 0 }
        ],
        {
          duration: 220,
          easing: shouldOpen ? "cubic-bezier(0.16, 1, 0.3, 1)" : "cubic-bezier(0.4, 0, 0.8, 0.2)"
        }
      );

      animation.onfinish = () => {
        content.hidden = !shouldOpen;
        content.style.removeProperty("height");
        content.style.removeProperty("overflow");
      };
    });
  });
})();
