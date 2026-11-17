(function () {
    "use strict";

    const mount = document.querySelector("[data-site-footer]");
    if (!mount) return;

    const script = document.currentScript;
    const base = script?.dataset.base || "";
    const url = (filePath) => `${base}${filePath}`;

    const fallback = `
        <footer class="site-footer" aria-label="Site footer">
            <div class="footer-inner">
                <div class="footer-brand-row">
                    <a class="footer-brand" href="index.html" aria-label="Path edits home"><img src="assets/logo_house.svg" alt="" aria-hidden="true"></a>
                    <a class="footer-cta" href="contact.html">Get my image edits →</a>
                </div>
                <nav class="footer-links" aria-label="Footer">
                    <div class="footer-column"><a href="pages/testimonials.html">Testimonials</a><a href="pages/blog.html">Blog</a><a href="pages/credits.html">Path credits</a><a href="pages/pricing.html">Pricing</a><a href="pages/affiliate-program.html">Affiliate program</a></div>
                    <div class="footer-column"><a href="pages/clipping-path.html">Services</a><a href="pages/sports-photo-edits.html">Sports photo edits</a><a href="pages/bulk-photo-edits.html">Bulk photo edits</a><a href="pages/clothing-apparel.html">Clothing &amp; Apparel</a><a href="pages/headshot-photographer.html">Headshot photographer</a></div>
                    <div class="footer-column"><a href="pages/path-catalog-health.html"><i class="fa-brands fa-shopify footer-app-icon" aria-hidden="true"></i>Path Catalog Health</a><a href="pages/about.html">About</a><a href="pages/how-it-works.html">How it works</a></div>
                    <div class="footer-column footer-help"><a href="contact.html">Help</a><a href="mailto:hello@pathedits.com">hello@pathedits.com</a><div class="footer-social"><a aria-label="Facebook" href="https://www.facebook.com/">f</a><a aria-label="Pinterest" href="https://www.pinterest.com/">p</a><a aria-label="LinkedIn" href="https://www.linkedin.com/">in</a><a aria-label="X" href="https://x.com/">x</a></div></div>
                </nav>
                <div class="footer-bottom"><p>Path is a brand of Outsource Experts Ltd. © <span data-current-year>2026</span> All rights reserved.</p><div><a href="pages/privacy-policy.html">Privacy policy</a><a href="pages/terms-conditions.html">Terms &amp; Conditions</a></div></div>
            </div>
        </footer>`;

    const render = (html) => {
        mount.outerHTML = html;
        document.querySelectorAll(".site-footer a[href^='pages/'], .site-footer a[href='index.html'], .site-footer a[href='contact.html']").forEach((link) => {
            link.href = url(link.getAttribute("href"));
        });
        const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
        document.querySelectorAll(".site-footer a[href]").forEach((link) => {
            const target = new URL(link.href, window.location.href);
            const targetPath = target.pathname.replace(/\/$/, "") || "/";
            if (target.origin === window.location.origin && targetPath === currentPath) {
                link.classList.add("active-link");
                link.setAttribute("aria-current", "page");
            }
        });
        const logo = document.querySelector(".site-footer .footer-brand img");
        if (logo) logo.src = url("assets/logo_house.svg");
        const year = document.querySelector("[data-current-year]");
        if (year) year.textContent = new Date().getFullYear();
    };

    fetch(url("components/footer.html"))
        .then((response) => {
            if (!response.ok) throw new Error("Footer unavailable");
            return response.text();
        })
        .then(render)
        .catch(() => render(fallback));
})();
