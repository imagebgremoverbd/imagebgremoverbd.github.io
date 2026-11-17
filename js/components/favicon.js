/** @format */

(function () {
    "use strict";

    const script = document.currentScript;
    const src = script?.getAttribute("src") || "";
    const basePath = script?.dataset.base || src.replace(/js\/components\/favicon\.js(?:[?#].*)?$/, "");
    const iconHref = `${basePath}assets/logo_house.svg`;

    // Keep this component safe to include alongside page-specific icons.
    document.querySelectorAll('link[rel~="icon"]').forEach((link) => link.remove());

    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.type = "image/svg+xml";
    icon.href = iconHref;
    document.head.appendChild(icon);
})();
