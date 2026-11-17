
/** @format */

(function () {
    "use strict";

    // =========================================
    // BASE PATH
    // =========================================

    const script = document.currentScript;
    const src = script ? script.getAttribute("src") || "" : "";

    const basePath =
        script?.dataset.base ||
        src.replace(/js\/layout\.js(?:[?#].*)?$/, "");

    const path = (filePath) => `${basePath}${filePath}`;


    // =========================================
    // NAVIGATION ITEMS
    // =========================================

    const serviceItems = [
        ["Clipping path", "Get precise background removal and clean cutouts for e-commerce and product images with our expert clipping path services.", "fa-wand-magic-sparkles", "clipping-path.html"],
        ["Multi-clipping path", "Select separate areas so each part can be edited independently.", "fa-layer-group", "multi-clipping-path.html"],
        ["Background removal", "Remove distracting backgrounds with pixel-perfect edges.", "fa-circle-dot", "background-removal.html"],
        ["Image masking", "Natural results for hair, fur, fabric, and fine detail.", "fa-square", "image-masking.html"],
        ["Shadow", "Add believable depth with natural or reflection shadows.", "fa-circle", "shadow-making.html"],
        ["Ghost mannequin", "Create polished, dimensional apparel photography.", "fa-shirt", "ghost-mannequin.html"],
        ["Symmetrical edit", "Create perfectly balanced apparel product photos.", "fa-arrows-left-right", "symmetrical-edit.html"],
        ["Color change", "Build accurate product colorways without another shoot.", "fa-circle-half-stroke", "color-change.html"],
        ["Photo retouching", "Refine color, texture, lighting, and imperfections.", "fa-wand-magic", "photo-retouching.html"],
        ["Vector conversion", "Turn raster artwork into sharp, scalable vector files.", "fa-pen-nib", "vector-conversion.html"]
    ];

    const serviceCards = serviceItems.map(([title, description, icon, page]) => `
        <a class="service-card" href="${path(`pages/${page}`)}">
            <span class="service-card-icon" aria-hidden="true"><i class="fa-solid ${icon}"></i></span>
            <span class="service-card-title">${title}</span>
            <span class="service-card-description">${description}</span>
        </a>
    `).join("");


    // =========================================
    // HEADER
    // =========================================

    const header = `
        <header class="site-header">

            <div class="navbar">

                <!-- LOGO -->
                <div class="logo">
                    <a href="${path("index.html")}" aria-label="Home">
                        <img
                            src="${path("assets/logo_house.svg")}"
                            alt="Logo House"
                        >
                    </a>
                </div>


                <!-- MAIN NAVIGATION -->
                <nav class="main-navigation" aria-label="Main navigation">
                    <ul class="nav-links">
                        <li data-nav-priority="how-it-works"><a href="${path("pages/how-it-works.html")}">How it works</a></li>
                        <li class="services-nav-item">
                            <a class="nav-dropdown-link" href="${path("pages/clipping-path.html")}" aria-expanded="false" aria-controls="services-mega-menu">
                                Image editing services <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
                            </a>
                            <section class="services-mega-menu" id="services-mega-menu" aria-label="Image editing services">
                                <div class="services-menu-heading">
                                    <h2>Get pixel perfect professional photo editing services</h2>
                                    <a href="${path("pages/clipping-path.html")}">View all services <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
                                </div>
                                <div class="services-grid">${serviceCards}</div>
                            </section>
                        </li>
                        <li class="apps-nav-item" data-nav-priority="apps">
                            <a class="nav-dropdown-link" href="${path("pages/apps.html")}" aria-expanded="false" aria-controls="apps-mega-menu">Apps <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></a>
                            <section class="apps-mega-menu" id="apps-mega-menu" aria-label="Apps">
                                <a class="app-menu-card" href="${path("pages/path-catalog-health.html")}">
                                    <span class="app-menu-icon" aria-hidden="true"><i class="fa-brands fa-shopify"></i></span>
                                    <span class="app-menu-copy">
                                        <span class="app-menu-title">Path Catalog Health</span>
                                        <span class="app-menu-description">Fix gallery order, variant images and alt text in Shopify, and send images to Path editors without leaving your admin.</span>
                                    </span>
                                    <i class="fa-solid fa-arrow-right app-menu-arrow" aria-hidden="true"></i>
                                </a>
                            </section>
                        </li>
                        <li data-nav-priority="credits"><a href="${path("pages/credits.html")}">Credits</a></li>
                        <li data-nav-priority="pricing"><a href="${path("pages/pricing.html")}">Pricing</a></li>
                        <li data-nav-priority="blog"><a href="${path("pages/blog.html")}">Blog</a></li>
                        <li><a href="${path("contact.html")}">Contact</a></li>
                        <li class="nav-more-item">
                            <button class="nav-dropdown-link nav-more-toggle" type="button" aria-expanded="false">
                                More <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
                            </button>
                            <ul class="nav-more-menu" aria-label="More navigation links"></ul>
                        </li>
                    </ul>
                </nav>


                <!-- NAVIGATION ACTIONS -->
                <div class="nav-actions">

                    <a
                        class="nav-cta"
                        href="${path("contact.html")}"
                    >
                        <span class="cta-full-text">Get my image edits</span>
                        <span class="cta-short-text">Get edits</span>
                        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </a>

                    <button class="mobile-menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu">
                        <span class="mobile-menu-label">Menu</span>
                        <span class="hamburger-lines" aria-hidden="true">
                            <span></span><span></span><span></span>
                        </span>
                    </button>


                    <!-- CURRENCY DROPDOWN -->
                    <div
                        class="nav-dropdown currency-dropdown"
                        data-currency-dropdown
                    >
                        <button
                            class="currency-toggle"
                            type="button"
                            aria-expanded="false"
                            aria-label="Selected currency: USD"
                        >
                            <span data-selected-currency>USD</span>

                            <i
                                class="fa-solid fa-chevron-down"
                                aria-hidden="true"
                            ></i>
                        </button>

                        <div class="dropdown-menu currency-menu" data-currency-menu></div>
                    </div>


                    <!-- LOGIN -->
                    <a class="login-link" href="${path("login.html")}">
                        <i
                            class="fa-regular fa-circle-user"
                            aria-hidden="true"
                        ></i>
                        Log in
                    </a>

                </div>

            </div>

            <section class="mobile-menu-panel" id="mobile-menu" aria-label="Mobile navigation" aria-hidden="true">
                <nav class="mobile-panel-nav" aria-label="Mobile main navigation">
                    <a class="mobile-panel-link" href="${path("pages/how-it-works.html")}">How it works</a>
                    <div class="mobile-services-group">
                        <div class="mobile-services-heading">
                            <a class="mobile-panel-link" href="${path("pages/clipping-path.html")}">Image editing services</a>
                            <button class="mobile-services-toggle" type="button" aria-expanded="false" aria-label="Show image editing services">
                                <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div class="mobile-services-grid">
                            ${serviceItems.map(([title, , icon, page]) => `
                                <a class="mobile-service-card" href="${path(`pages/${page}`)}">
                                    <i class="fa-solid ${icon}" aria-hidden="true"></i><span>${title}</span>
                                </a>
                            `).join("")}
                            <a class="mobile-view-services" href="${path("pages/clipping-path.html")}">View all services <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <a class="mobile-panel-link" href="${path("pages/credits.html")}">Credits</a>
                    <a class="mobile-panel-link" href="${path("pages/pricing.html")}">Pricing</a>
                    <a class="mobile-panel-link" href="${path("pages/testimonials.html")}">Testimonials</a>
                    <a class="mobile-panel-link" href="${path("pages/path-catalog-health.html")}">Path Catalog Health</a>
                    <a class="mobile-panel-link" href="${path("pages/blog.html")}">Blog</a>
                    <a class="mobile-panel-link" href="${path("contact.html")}">Contact</a>
                </nav>
                <div class="mobile-currency-row">
                    <span>CURRENCY</span>
                    <div data-mobile-currency-slot></div>
                </div>
                <div class="mobile-panel-actions">
                    <div data-mobile-cta-slot></div>
                    <div data-mobile-login-slot></div>
                </div>
            </section>
        </header>

        <!-- SECONDARY INFORMATION BAR -->
        <div class="trust-bar">
                <div class="trust-viewport" data-trust-viewport>
                    <div class="trust-track" data-trust-track>
                        <div class="trust-group" data-trust-group>
                            <div class="trust-item trust-price">
                                <i class="fa-solid fa-dollar-sign" aria-hidden="true"></i>
                                <span>From <span data-price-usd="0.25">$0.25</span> per image</span>
                            </div>
                            <span class="trust-separator" aria-hidden="true"></span>
                            <div class="trust-item">
                                <i class="fa-regular fa-heart" aria-hidden="true"></i>
                                <span>24/7 support</span>
                            </div>
                            <span class="trust-separator" aria-hidden="true"></span>
                            <div class="trust-item">
                                <i class="fa-regular fa-clock" aria-hidden="true"></i>
                                <span>Turnaround from 6 hours</span>
                            </div>
                            <span class="trust-separator" aria-hidden="true"></span>
                            <a class="trust-item trustpilot-item" href="${path("pages/testimonials.html")}">
                                <span>Excellent 4.8 out of 5</span>
                                <span class="trustpilot-brand"><span class="trustpilot-star" aria-hidden="true">&#9733;</span><span>Trustpilot</span></span>
                            </a>
                            <span class="trust-separator" aria-hidden="true"></span>
                            <div class="trust-item trust-quality">
                                <i class="fa-solid fa-shield-halved" aria-hidden="true"></i>
                                <span>Quality guaranteed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


    `;


    // =========================================
    // INSERT HEADER
    // =========================================

    const headerMount = document.querySelector("[data-site-header]");

    if (headerMount) {
        headerMount.outerHTML = header;
    }

    const siteHeader = document.querySelector(".site-header");
    const navbar = siteHeader?.querySelector(".navbar");
    const navLinks = siteHeader?.querySelector(".nav-links");
    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    const currentServiceSlug = currentPath.toLowerCase().split("/").pop().replace(/\.html?$/, "");
    const pageHeading = document.querySelector("main h1")?.textContent || "";
    const serviceIdentityMatchers = [
        /\bclipping\s+path\b/,
        /\bmulti\s+clipping\s+path\b|\bmulti\s+path\b/,
        /\bbackground\s+removal\b/,
        /\bimage\s+masking\b/,
        /\bshadow(?:s|\s+making|\s+editing)?\b/,
        /\bghost\s+mannequin\b/,
        /\bsymmetr(?:ical|y)\s+edit(?:ing)?\b/,
        /\bcolor\s+chang(?:e|ing)\b/,
        /\bphoto\s+retouch(?:ing)?\b|\bretouching\b/,
        /\bvector\s+convers(?:ion|ions)\b/
    ];
    const identifyServiceFromText = (text) => {
        const identity = text.toLowerCase().replace(/[_.\/-]+/g, " ");
        if (/\bmulti\s+clipping\s+path\b|\bmulti\s+path\b/.test(identity)) return 1;
        return serviceIdentityMatchers.findIndex((matcher) => matcher.test(identity));
    };
    let currentServiceIndex = identifyServiceFromText(pageHeading);
    if (currentServiceIndex < 0) currentServiceIndex = identifyServiceFromText(document.title);
    const servicePathAliases = [
        ["services", "clipping-path", "clipping-path-service"],
        ["multi-clipping-path", "multi-clipping-path-services", "multi-path"],
        ["background-removal", "background-removal-service"],
        ["image-masking", "image-masking-service", "masking"],
        ["shadow", "shadows", "shadow-making", "shadow-editing", "shadow-service"],
        ["ghost-mannequin", "ghost-mannequin-service"],
        ["symmetrical-edit", "symmetrical-editing", "symmetry"],
        ["color-change", "color-changing"],
        ["photo-retouching", "photo-retouch", "retouching"],
        ["vector-conversion", "vector-convert"]
    ];
    if (currentServiceIndex < 0) {
        currentServiceIndex = servicePathAliases.findIndex((aliases) => aliases.includes(currentServiceSlug));
    }
    if (currentServiceIndex >= 0) {
        const serviceCards = siteHeader?.querySelectorAll(".service-card") || [];
        const mobileServiceCards = siteHeader?.querySelectorAll(".mobile-service-card") || [];
        [serviceCards[currentServiceIndex], mobileServiceCards[currentServiceIndex]].forEach((card) => {
            if (!card) return;
            card.classList.add("is-current");
            card.setAttribute("aria-current", "page");
        });
    }
    siteHeader?.querySelectorAll(".nav-links a[href], .mobile-menu-panel a[href]").forEach((link) => {
        if (link.closest(".services-mega-menu, .apps-mega-menu")) return;
        const linkPath = new URL(link.href, window.location.href).pathname.replace(/\/$/, "") || "/";
        if (linkPath === currentPath) {
            link.classList.add("active-link");
            link.setAttribute("aria-current", "page");
        }
    });
    const contactItem = navLinks?.querySelector('a[href$="contact.html"]')?.closest("li");
    const moreItem = navLinks?.querySelector(".nav-more-item");
    const moreMenu = moreItem?.querySelector(".nav-more-menu");
    const moreToggle = moreItem?.querySelector(".nav-more-toggle");
    const priorityItems = Array.from(navLinks?.querySelectorAll("[data-nav-priority]") || []);
    const originalNavItems = Array.from(navLinks?.children || []).filter((item) => item !== moreItem);
    const servicesItem = navLinks?.querySelector(".services-nav-item");
    const servicesToggle = servicesItem?.querySelector(":scope > .nav-dropdown-link");
    const servicesPath = servicesToggle ? new URL(servicesToggle.href, window.location.href).pathname.replace(/\/$/, "") : "";
    if (servicesToggle && currentPath === servicesPath) {
        servicesToggle.classList.add("active-link");
        servicesToggle.setAttribute("aria-current", "page");
    }
    const closeServicesMenu = () => {
        servicesItem?.classList.remove("is-open");
        servicesToggle?.setAttribute("aria-expanded", "false");
    };

    servicesItem?.addEventListener("pointerenter", () => {
        servicesItem.classList.remove("is-dismissed");
    });

    servicesToggle?.addEventListener("click", (event) => {
        event.preventDefault();
        const open = !servicesItem.classList.contains("is-open");
        servicesItem.classList.toggle("is-open", open);
        servicesItem.classList.toggle("is-dismissed", !open);
        servicesToggle.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", (event) => {
        if (servicesItem && !servicesItem.contains(event.target)) closeServicesMenu();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && servicesItem?.classList.contains("is-open")) {
            closeServicesMenu();
            servicesItem.classList.add("is-dismissed");
            servicesToggle?.focus();
        }
    });

    const appsItem = navLinks?.querySelector(".apps-nav-item");
    const appsToggle = appsItem?.querySelector(":scope > .nav-dropdown-link");
    const closeAppsMenu = () => {
        appsItem?.classList.remove("is-open");
        appsToggle?.setAttribute("aria-expanded", "false");
    };

    appsItem?.addEventListener("pointerenter", () => {
        appsItem.classList.remove("is-dismissed");
    });

    appsToggle?.addEventListener("click", (event) => {
        event.preventDefault();
        const open = !appsItem.classList.contains("is-open");
        appsItem.classList.toggle("is-open", open);
        appsItem.classList.toggle("is-dismissed", !open);
        appsToggle.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", (event) => {
        if (appsItem && !appsItem.contains(event.target)) closeAppsMenu();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && appsItem?.classList.contains("is-open")) {
            closeAppsMenu();
            appsItem.classList.add("is-dismissed");
            appsToggle?.focus();
        }
    });

    const syncMoreNavigation = () => {
        if (!navLinks || !moreItem || !moreMenu) return;

        // Restore the source order before applying the current desktop breakpoint.
        originalNavItems.forEach((item) => navLinks.insertBefore(item, moreItem));
        if (contactItem?.parentElement === navLinks) {
            navLinks.insertBefore(moreItem, contactItem.nextSibling);
        }
        const width = window.innerWidth;
        const moveAtWidth = {
            apps: width <= 970,
            credits: width <= 1280,
            pricing: width <= 1280,
            "how-it-works": width <= 1180,
            blog: width <= 1050
        };

        priorityItems.forEach((item) => {
            if (width > 700 && moveAtWidth[item.dataset.navPriority]) {
                moreMenu.appendChild(item);
            }
        });

        const hasMoreLinks = moreMenu.children.length > 0;
        moreItem.hidden = !hasMoreLinks || width <= 700;
        moreToggle?.classList.toggle("active-link", Boolean(moreMenu.querySelector("a.active-link")));
        moreToggle?.setAttribute("aria-expanded", "false");
        moreItem.classList.remove("is-open", "is-dismissed");
    };

    moreItem?.addEventListener("pointerenter", () => {
        moreItem.classList.remove("is-dismissed");
    });

    moreToggle?.addEventListener("click", () => {
        const open = !moreItem.classList.contains("is-open");
        moreItem.classList.toggle("is-open", open);
        moreItem.classList.toggle("is-dismissed", !open);
        moreToggle.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", (event) => {
        if (moreItem && !moreItem.contains(event.target)) {
            moreItem.classList.remove("is-open");
            moreToggle?.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && moreItem?.classList.contains("is-open")) {
            moreItem.classList.remove("is-open");
            moreItem.classList.add("is-dismissed");
            moreToggle?.setAttribute("aria-expanded", "false");
            moreToggle?.focus();
        }
    });

    syncMoreNavigation();
    window.addEventListener("resize", syncMoreNavigation);
    const syncServicesMenuPosition = () => {
        if (!navbar || !siteHeader) return;
        siteHeader.style.setProperty(
            "--navbar-height",
            `${navbar.getBoundingClientRect().height}px`
        );
    };

    syncServicesMenuPosition();
    window.addEventListener("resize", syncServicesMenuPosition);

    const mobileMenuToggle = siteHeader?.querySelector(".mobile-menu-toggle");
    const mobileMenuPanel = siteHeader?.querySelector(".mobile-menu-panel");
    const mobileServicesToggle = siteHeader?.querySelector(".mobile-services-toggle");
    const mobileServicesGroup = siteHeader?.querySelector(".mobile-services-group");
    const navActions = siteHeader?.querySelector(".nav-actions");
    const desktopCta = siteHeader?.querySelector(".nav-actions > .nav-cta");
    const currencyDropdown = siteHeader?.querySelector("[data-currency-dropdown]");
    const loginLink = siteHeader?.querySelector(".login-link");
    const mobileCurrencySlot = siteHeader?.querySelector("[data-mobile-currency-slot]");
    const mobileCtaSlot = siteHeader?.querySelector("[data-mobile-cta-slot]");
    const mobileLoginSlot = siteHeader?.querySelector("[data-mobile-login-slot]");

    if (desktopCta && mobileCtaSlot) {
        const panelCta = desktopCta.cloneNode(true);
        panelCta.classList.add("mobile-panel-cta");
        mobileCtaSlot.appendChild(panelCta);
    }

    if (mobileMenuToggle && mobileMenuPanel && navActions) {
        const compactNavigation = window.matchMedia("(max-width: 700px)");
        const servicesAccordion = window.matchMedia("(max-width: 600px)");

        const closeMobileMenu = () => {
            siteHeader.classList.remove("mobile-menu-open");
            mobileMenuToggle.setAttribute("aria-expanded", "false");
            mobileMenuPanel.setAttribute("aria-hidden", "true");
            mobileServicesGroup?.classList.remove("is-expanded");
            mobileServicesToggle?.setAttribute("aria-expanded", "false");
        };

        const syncMobileNavigation = () => {
            if (compactNavigation.matches) {
                const servicesAlwaysOpen = !servicesAccordion.matches;
                mobileServicesGroup?.classList.toggle("is-expanded", servicesAlwaysOpen);
                mobileServicesToggle?.setAttribute("aria-expanded", String(servicesAlwaysOpen));
                if (currencyDropdown && mobileCurrencySlot && currencyDropdown.parentElement !== mobileCurrencySlot) {
                    mobileCurrencySlot.appendChild(currencyDropdown);
                }
                if (loginLink && mobileLoginSlot && loginLink.parentElement !== mobileLoginSlot) {
                    mobileLoginSlot.appendChild(loginLink);
                }
            } else {
                closeMobileMenu();
                if (currencyDropdown && mobileMenuToggle.parentElement === navActions) {
                    navActions.insertBefore(currencyDropdown, mobileMenuToggle);
                }
                if (loginLink && loginLink.parentElement !== navActions) {
                    navActions.appendChild(loginLink);
                }
            }

            syncServicesMenuPosition();
        };

        mobileMenuToggle.addEventListener("click", () => {
            const open = !siteHeader.classList.contains("mobile-menu-open");
            siteHeader.classList.toggle("mobile-menu-open", open);
            mobileMenuToggle.setAttribute("aria-expanded", String(open));
            mobileMenuPanel.setAttribute("aria-hidden", String(!open));
        });

        mobileServicesToggle?.addEventListener("click", () => {
            const open = !mobileServicesGroup.classList.contains("is-expanded");
            mobileServicesGroup.classList.toggle("is-expanded", open);
            mobileServicesToggle.setAttribute("aria-expanded", String(open));
        });

        mobileMenuPanel.addEventListener("click", (event) => {
            if (event.target.closest("a")) closeMobileMenu();
        });

        document.addEventListener("click", (event) => {
            if (compactNavigation.matches && !siteHeader.contains(event.target)) {
                closeMobileMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && siteHeader.classList.contains("mobile-menu-open")) {
                closeMobileMenu();
                mobileMenuToggle.focus();
            }
        });

        compactNavigation.addEventListener("change", syncMobileNavigation);
        servicesAccordion.addEventListener("change", syncMobileNavigation);
        syncMobileNavigation();
    }

    // Enable a draggable, pausable ticker on compact screens.
    const ticker = document.querySelector("[data-trust-viewport]");
    const tickerTrack = ticker?.querySelector("[data-trust-track]");
    const tickerGroup = ticker?.querySelector("[data-trust-group]");

    if (ticker && tickerTrack && tickerGroup) {
        const compactScreen = window.matchMedia("(max-width: 1100px)");
        const singleItemScreen = window.matchMedia("(max-width: 790px)");
        const rotatingItems = Array.from(tickerGroup.querySelectorAll(".trust-item"));
        let tickerCopy = null;
        let frame = 0;
        let lastFrameTime = 0;
        let itemTimer = 0;
        let modeVersion = 0;
        let activeItemIndex = 0;
        let paused = false;
        let hovering = false;
        let dragging = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let singleDragDeltaY = 0;
        let singleDragNeighbor = null;
        let dragStartScroll = 0;
        let horizontalOffset = 0;
        let activePointerId = null;

        const syncPausedState = () => {
            paused = hovering || dragging;
        };

        const showRotatingItem = (index, direction = 1) => {
            const transitionVersion = modeVersion;
            const previousItem = rotatingItems[activeItemIndex];
            const nextItem = rotatingItems[index];
            if (previousItem && previousItem !== nextItem) {
                previousItem.classList.remove("is-active");
                previousItem.classList.remove("is-leaving-down");
                previousItem.classList.add(direction < 0 ? "is-leaving-down" : "is-leaving");
                window.setTimeout(() => {
                    if (transitionVersion === modeVersion) previousItem.classList.remove("is-leaving", "is-leaving-down");
                }, 300);
            }
            if (nextItem) {
                nextItem.classList.remove("is-leaving", "is-leaving-down", "is-entering-from-top", "is-entering-from-bottom", "is-active");
                nextItem.classList.add(direction < 0 ? "is-entering-from-top" : "is-entering-from-bottom");
                window.requestAnimationFrame(() => {
                    if (transitionVersion !== modeVersion) return;
                    nextItem.classList.remove("is-entering-from-top", "is-entering-from-bottom");
                    nextItem.classList.add("is-active");
                });
            }
            activeItemIndex = index;
        };

        const startRotatingTimer = () => {
            if (itemTimer) window.clearInterval(itemTimer);
            itemTimer = window.setInterval(() => {
                if (paused || !rotatingItems.length) return;
                const nextIndex = (activeItemIndex + 1) % rotatingItems.length;
                showRotatingItem(nextIndex);
            }, 2000);
        };

        const finishSingleItemDrag = (shouldCommit) => {
            const transitionVersion = modeVersion;
            const currentItem = rotatingItems[activeItemIndex];
            const direction = singleDragDeltaY < 0 ? 1 : -1;
            const nextIndex = (activeItemIndex + direction + rotatingItems.length) % rotatingItems.length;
            const nextItem = rotatingItems[nextIndex];
            const height = tickerGroup.getBoundingClientRect().height;
            const commit = shouldCommit && Math.abs(singleDragDeltaY) >= 42;

            tickerGroup.classList.remove("is-pointer-dragging");
            window.requestAnimationFrame(() => {
                if (transitionVersion !== modeVersion) return;
                if (commit) {
                    currentItem.style.transform = `translateY(${direction > 0 ? -height : height}px)`;
                    nextItem.style.transform = "translateY(0)";
                    window.setTimeout(() => {
                        if (transitionVersion !== modeVersion) return;
                        currentItem.classList.remove("is-active");
                        nextItem.classList.add("is-active");
                        currentItem.classList.remove("is-drag-current", "is-drag-neighbor");
                        nextItem.classList.remove("is-drag-current", "is-drag-neighbor");
                        currentItem.style.removeProperty("transform");
                        currentItem.style.removeProperty("opacity");
                        nextItem.style.removeProperty("transform");
                        nextItem.style.removeProperty("opacity");
                        activeItemIndex = nextIndex;
                        startRotatingTimer();
                    }, 300);
                } else {
                    currentItem.style.removeProperty("transform");
                    currentItem.style.removeProperty("opacity");
                    nextItem.style.removeProperty("transform");
                    nextItem.style.removeProperty("opacity");
                    window.setTimeout(() => {
                        if (transitionVersion !== modeVersion) return;
                        currentItem.classList.remove("is-drag-current", "is-drag-neighbor");
                        nextItem.classList.remove("is-drag-current", "is-drag-neighbor");
                        startRotatingTimer();
                    }, 300);
                }
            });
            singleDragDeltaY = 0;
        };

        const tickerSpeed = 28; // Increase this number for faster movement (pixels per second).
        const animateTicker = (timestamp) => {
            if (!lastFrameTime) lastFrameTime = timestamp;
            const elapsed = Math.min(timestamp - lastFrameTime, 50);
            lastFrameTime = timestamp;

            if (!paused && !dragging) {
                const loopWidth = tickerGroup.getBoundingClientRect().width;
                if (loopWidth) {
                    horizontalOffset -= tickerSpeed * elapsed / 1000;
                    if (horizontalOffset <= -loopWidth) horizontalOffset += loopWidth;
                    tickerTrack.style.transform = `translate3d(${horizontalOffset}px, 0, 0)`;
                }
            }

            frame = window.requestAnimationFrame(animateTicker);
        };

        const updateTickerMode = () => {
            modeVersion += 1;
            if (frame) window.cancelAnimationFrame(frame);
            frame = 0;
            lastFrameTime = 0;
            if (itemTimer) window.clearInterval(itemTimer);
            itemTimer = 0;
            if (activePointerId !== null && ticker.hasPointerCapture(activePointerId)) {
                ticker.releasePointerCapture(activePointerId);
            }
            activePointerId = null;
            paused = false;
            hovering = false;
            dragging = false;
            ticker.classList.remove("is-dragging");
            tickerGroup.classList.remove("is-pointer-dragging");
            rotatingItems.forEach((item) => {
                item.classList.remove("is-active", "is-leaving", "is-leaving-down", "is-entering-from-top", "is-entering-from-bottom", "is-drag-current", "is-drag-neighbor");
                item.style.removeProperty("transform");
                item.style.removeProperty("opacity");
            });
            singleDragNeighbor = null;
            singleDragDeltaY = 0;

            if (compactScreen.matches) {

                if (singleItemScreen.matches) {
                    tickerCopy?.remove();
                    tickerCopy = null;
                    ticker.classList.add("is-single-item");
                    rotatingItems.forEach((item) => item.classList.remove("is-active", "is-leaving", "is-leaving-down", "is-entering-from-top", "is-entering-from-bottom"));
                    activeItemIndex = 0;
                    showRotatingItem(activeItemIndex);
                    startRotatingTimer();
                } else {
                    ticker.classList.remove("is-single-item");
                    rotatingItems.forEach((item) => item.classList.remove("is-active", "is-leaving", "is-leaving-down", "is-entering-from-top", "is-entering-from-bottom"));
                }

                if (!singleItemScreen.matches && !tickerCopy) {
                    tickerCopy = tickerGroup.cloneNode(true);
                    tickerCopy.removeAttribute("data-trust-group");
                    tickerCopy.setAttribute("aria-hidden", "true");
                    tickerCopy.inert = true;
                    tickerTrack.appendChild(tickerCopy);
                }
                ticker.scrollLeft = 0;
                horizontalOffset = 0;
                tickerTrack.style.removeProperty("transform");
                if (!singleItemScreen.matches) {
                    frame = window.requestAnimationFrame(animateTicker);
                }
            } else {
                tickerCopy?.remove();
                tickerCopy = null;
                ticker.classList.remove("is-single-item");
                rotatingItems.forEach((item) => item.classList.remove("is-active", "is-leaving", "is-leaving-down", "is-entering-from-top", "is-entering-from-bottom"));
                ticker.scrollLeft = 0;
                horizontalOffset = 0;
                tickerTrack.style.removeProperty("transform");
                paused = false;
                dragging = false;
            }
        };

        ticker.addEventListener("pointerenter", (event) => {
            if (!compactScreen.matches || event.pointerType !== "mouse") return;
            hovering = true;
            syncPausedState();
        });

        ticker.addEventListener("pointerleave", (event) => {
            if (event.pointerType !== "mouse") return;
            hovering = false;
            syncPausedState();
        });

        ticker.addEventListener("pointerdown", (event) => {
            if (!compactScreen.matches || event.button > 0) return;
            dragging = true;
            syncPausedState();
            activePointerId = event.pointerId;
            dragStartX = event.clientX;
            dragStartY = event.clientY;
            dragStartScroll = horizontalOffset;
            singleDragDeltaY = 0;
            singleDragNeighbor = null;
            if (singleItemScreen.matches) {
                if (itemTimer) window.clearInterval(itemTimer);
                itemTimer = 0;
                tickerGroup.classList.add("is-pointer-dragging");
                const activeItem = rotatingItems[activeItemIndex];
                activeItem.classList.add("is-drag-current");
                activeItem.style.transform = "translateY(0)";
                activeItem.style.opacity = "1";
            }
            ticker.classList.add("is-dragging");
            ticker.setPointerCapture(event.pointerId);
        });

        ticker.addEventListener("pointermove", (event) => {
            if (!dragging || event.pointerId !== activePointerId) return;
            if (singleItemScreen.matches) {
                const deltaY = event.clientY - dragStartY;
                singleDragDeltaY = deltaY;
                const currentItem = rotatingItems[activeItemIndex];
                const direction = deltaY < 0 ? 1 : -1;
                const nextIndex = (activeItemIndex + direction + rotatingItems.length) % rotatingItems.length;
                const nextItem = rotatingItems[nextIndex];
                const height = tickerGroup.getBoundingClientRect().height;

                if (singleDragNeighbor && singleDragNeighbor !== nextItem) {
                    singleDragNeighbor.style.removeProperty("transform");
                    singleDragNeighbor.style.removeProperty("opacity");
                    singleDragNeighbor.classList.remove("is-drag-neighbor");
                }
                currentItem.style.transform = `translateY(${deltaY}px)`;
                currentItem.style.opacity = "1";
                if (Math.abs(deltaY) > 0) {
                    nextItem.classList.remove("is-active", "is-leaving", "is-leaving-down", "is-entering-from-top", "is-entering-from-bottom");
                    nextItem.classList.add("is-drag-neighbor");
                    nextItem.style.transform = `translateY(${(direction > 0 ? height : -height) + deltaY}px)`;
                    nextItem.style.opacity = "1";
                    singleDragNeighbor = nextItem;
                }
                return;
            }
            const loopWidth = tickerGroup.getBoundingClientRect().width;
            if (!loopWidth) return;
            let dragPosition = (dragStartScroll + event.clientX - dragStartX) % loopWidth;
            if (dragPosition > 0) dragPosition -= loopWidth;
            horizontalOffset = dragPosition;
            tickerTrack.style.transform = `translate3d(${horizontalOffset}px, 0, 0)`;
        });

        const releaseTicker = (event) => {
            if (!dragging || event.pointerId !== activePointerId) return;
            if (singleItemScreen.matches) {
                finishSingleItemDrag(event.type === "pointerup");
                singleDragNeighbor = null;
            }
            dragging = false;
            activePointerId = null;
            syncPausedState();
            ticker.classList.remove("is-dragging");
        };

        ticker.addEventListener("pointerup", releaseTicker);
        ticker.addEventListener("pointercancel", releaseTicker);
        compactScreen.addEventListener("change", updateTickerMode);
        singleItemScreen.addEventListener("change", updateTickerMode);
        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) updateTickerMode();
        });
        updateTickerMode();
    }

})();








