
/** @format */

(function () {
    "use strict";

    // =========================================
    // CURRENCY SETTINGS
    // =========================================

    const API_URL = "https://open.er-api.com/v6/latest/USD";

    const STORAGE_KEYS = {
        selected: "selectedCurrency",
        rates: "currencyRates",
        updated: "currencyRatesUpdated"
    };

    const UPDATE_INTERVAL = 12 * 60 * 60 * 1000;

    const supportedCurrencies = [
        "AED", "AFN", "ALL", "ARS", "AUD", "BDT", "BGN", "BHD",
        "BRL", "CAD", "CHF", "CLP", "CNY", "COP", "CZK", "DKK",
        "EGP", "EUR", "GBP", "GHS", "HKD", "HUF", "IDR", "ILS",
        "INR", "IQD", "IRR", "ISK", "JOD", "JPY", "KES", "KWD",
        "LBP", "LKR", "MAD", "MXN", "MYR", "NGN", "NOK", "NZD",
        "OMR", "PEN", "PHP", "PKR", "PLN", "QAR", "RON", "RUB",
        "SAR", "SEK", "SGD", "THB", "TRY", "TWD", "UAH", "USD",
        "UYU", "VND", "ZAR"
    ];

    const currencyFlags = {
        AED: "ae", AFN: "af", ALL: "al", ARS: "ar", AUD: "au",
        BDT: "bd", BGN: "bg", BHD: "bh", BRL: "br", CAD: "ca",
        CHF: "ch", CLP: "cl", CNY: "cn", COP: "co", CZK: "cz",
        DKK: "dk", EGP: "eg", EUR: "eu", GBP: "gb", GHS: "gh",
        HKD: "hk", HUF: "hu", IDR: "id", ILS: "il", INR: "in",
        IQD: "iq", IRR: "ir", ISK: "is", JOD: "jo", JPY: "jp",
        KES: "ke", KWD: "kw", LBP: "lb", LKR: "lk", MAD: "ma",
        MXN: "mx", MYR: "my", NGN: "ng", NOK: "no", NZD: "nz",
        OMR: "om", PEN: "pe", PHP: "ph", PKR: "pk", PLN: "pl",
        QAR: "qa", RON: "ro", RUB: "ru", SAR: "sa", SEK: "se",
        SGD: "sg", THB: "th", TRY: "tr", TWD: "tw", UAH: "ua",
        USD: "us", UYU: "uy", VND: "vn", ZAR: "za"
    };

    let selectedCurrency = "USD";
    let exchangeRates = { USD: 1 };
    let fetchPromise = null;
    let selectionSequence = 0;


    // =========================================
    // STORAGE
    // =========================================

    const storage = {
        get(key) {
            try {
                return sessionStorage.getItem(key);
            } catch (error) {
                return null;
            }
        },

        set(key, value) {
            try {
                sessionStorage.setItem(key, value);
            } catch (error) {
                console.warn("Could not save currency settings.");
            }
        }
    };


    // =========================================
    // LOAD SAVED CURRENCY
    // =========================================

    const savedCurrency = storage.get(STORAGE_KEYS.selected);

    if (supportedCurrencies.includes(savedCurrency)) {
        selectedCurrency = savedCurrency;
    }


    // =========================================
    // LOAD CACHED RATES
    // =========================================

    const loadCachedRates = () => {
        try {
            const savedRates = storage.get(STORAGE_KEYS.rates);

            if (!savedRates) return;

            const parsedRates = JSON.parse(savedRates);
            const cachedRates = { USD: 1 };

            supportedCurrencies.forEach((currency) => {
                const rate = Number(parsedRates?.[currency]);

                if (Number.isFinite(rate) && rate > 0) {
                    cachedRates[currency] = rate;
                }
            });

            exchangeRates = cachedRates;

        } catch (error) {
            console.warn("Could not load cached exchange rates.", error);
        }
    };


    // =========================================
    // CHECK EXCHANGE RATE
    // =========================================

    const hasRate = (currency) => {
        return Number.isFinite(exchangeRates[currency]) &&
            exchangeRates[currency] > 0;
    };


    // =========================================
    // FORMAT PRICE
    // =========================================

    const formatPrice = (usdPrice) => {
        const rate = exchangeRates[selectedCurrency];

        if (!hasRate(selectedCurrency)) {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(usdPrice);
        }

        try {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: selectedCurrency
            }).format(usdPrice * rate);

        } catch (error) {
            return `${(usdPrice * rate).toFixed(2)} ${selectedCurrency}`;
        }
    };


    // =========================================
    // UPDATE WEBSITE PRICES
    // =========================================

    const updatePrices = () => {
        document.querySelectorAll("[data-price-usd]").forEach((element) => {
            const usdPrice = Number(element.dataset.priceUsd);

            if (!Number.isFinite(usdPrice) || usdPrice < 0) return;

            element.textContent = formatPrice(usdPrice);
        });
    };


    // =========================================
    // UPDATE CURRENCY BUTTON
    // =========================================

    const updateCurrencyButton = () => {
        const selectedElement = document.querySelector(
            "[data-selected-currency]"
        );

        if (selectedElement) {
            selectedElement.textContent = selectedCurrency;
        }

        const toggle = document.querySelector(
            "[data-currency-dropdown] .currency-toggle"
        );

        if (toggle) {
            toggle.setAttribute(
                "aria-label",
                `Selected currency: ${selectedCurrency}`
            );
        }

        document.querySelectorAll("[data-currency]").forEach((button) => {
            button.setAttribute(
                "aria-pressed",
                String(button.dataset.currency === selectedCurrency)
            );
        });
    };


    // =========================================
    // BUILD CURRENCY MENU
    // =========================================

    const renderCurrencyMenu = (menu) => {
        menu.innerHTML = supportedCurrencies.map((currency) => `
            <button type="button" data-currency="${currency}" aria-pressed="false">
                <img class="currency-flag" src="https://flagcdn.com/w40/${currencyFlags[currency]}.png" alt="" loading="lazy">
                <span>${currency}</span>
            </button>
        `).join("");
    };


    // =========================================
    // SAVE SELECTED CURRENCY
    // =========================================

    const selectCurrency = async (currency) => {
        if (!supportedCurrencies.includes(currency)) return;

        const thisSelection = ++selectionSequence;
        const previousCurrency = selectedCurrency;

        // Update the control immediately so a slow rate request doesn't make
        // the visitor's selection appear to have been ignored.
        selectedCurrency = currency;
        storage.set(STORAGE_KEYS.selected, currency);
        updateCurrencyButton();
        updatePrices();

        // Fetch a current rate when this currency is not already cached.
        if (!hasRate(currency)) {
            await fetchExchangeRates();
        }

        if (thisSelection !== selectionSequence) return;

        // Restore the prior choice if conversion data is unavailable.
        if (!hasRate(currency)) {
            selectedCurrency = previousCurrency;
            storage.set(STORAGE_KEYS.selected, previousCurrency);
            updateCurrencyButton();
            updatePrices();
            console.error(
                `Exchange rate for ${currency} is unavailable.`
            );
            return;
        }

        updateCurrencyButton();
        updatePrices();

        console.log(`Currency changed to ${currency}`);
    };


    // =========================================
    // FETCH EXCHANGE RATES
    // =========================================

    const fetchExchangeRates = async () => {
        // Reuse an existing request instead of making another one.
        if (fetchPromise) {
            return fetchPromise;
        }

        fetchPromise = (async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }

                const data = await response.json();
                const rates = data.rates || data.conversion_rates;

                if (
                    data.result !== "success" ||
                    !rates
                ) {
                    throw new Error("Invalid exchange rate response.");
                }

                const newRates = { USD: 1 };

                supportedCurrencies.forEach((currency) => {
                    const rate = Number(
                        rates[currency]
                    );

                    if (Number.isFinite(rate) && rate > 0) {
                        newRates[currency] = rate;
                    }
                });

                if (Object.keys(newRates).length < 2) {
                    throw new Error("No usable exchange rates returned.");
                }

                exchangeRates = newRates;

                storage.set(
                    STORAGE_KEYS.rates,
                    JSON.stringify(exchangeRates)
                );

                storage.set(
                    STORAGE_KEYS.updated,
                    Date.now().toString()
                );

                updateCurrencyButton();
                updatePrices();

                console.log("Exchange rates updated successfully.");

                return true;

            } catch (error) {
                console.error("Exchange rate update failed:", error);
                return false;

            } finally {
                fetchPromise = null;
            }
        })();

        return fetchPromise;
    };


    // =========================================
    // CHECK RATE UPDATE TIME
    // =========================================

    const updateRatesIfNeeded = async () => {
        const lastUpdated = Number(
            storage.get(STORAGE_KEYS.updated)
        ) || 0;

        const ratesAreOld =
            Date.now() - lastUpdated >= UPDATE_INTERVAL;

        if (ratesAreOld) {
            await fetchExchangeRates();
        }
    };


    // =========================================
    // CURRENCY DROPDOWN
    // =========================================

    const setupCurrencyDropdown = () => {
        const dropdown = document.querySelector(
            "[data-currency-dropdown]"
        );

        if (!dropdown) return;

        const toggle = dropdown.querySelector(".currency-toggle");
        const menu = dropdown.querySelector(".currency-menu");

        if (!toggle || !menu) return;

        renderCurrencyMenu(menu);
        updateCurrencyButton();
        let pinnedOpen = false;

        const setOpen = (open) => {
            dropdown.classList.toggle("is-open", open);
            toggle.setAttribute("aria-expanded", String(open));

            if (open) {
                const toggleRect = toggle.getBoundingClientRect();
                const menuHeight = menu.getBoundingClientRect().height;
                const spaceBelow = window.innerHeight - toggleRect.bottom;
                const spaceAbove = toggleRect.top;

                dropdown.classList.toggle(
                    "opens-up",
                    spaceBelow < menuHeight && spaceAbove > spaceBelow
                );
            } else {
                dropdown.classList.remove("opens-up");
            }
        };

        // Hover opens temporarily. Clicking pins the menu until clicked again.
        dropdown.addEventListener("pointerenter", (event) => {
            if (event.pointerType === "touch" || pinnedOpen) return;
            setOpen(true);
        });

        dropdown.addEventListener("pointerleave", () => {
            if (!pinnedOpen) setOpen(false);
        });

        dropdown.addEventListener("focusin", () => setOpen(true));
        dropdown.addEventListener("focusout", (event) => {
            if (!pinnedOpen && !dropdown.contains(event.relatedTarget)) setOpen(false);
        });

        window.addEventListener("resize", () => {
            if (dropdown.classList.contains("is-open")) setOpen(true);
        });

        toggle.addEventListener("click", () => {
            pinnedOpen = !pinnedOpen;
            setOpen(pinnedOpen);
        });

        // SELECT CURRENCY
        menu.addEventListener("click", async (event) => {
            const button = event.target.closest("[data-currency]");

            if (!button || !menu.contains(button)) return;

            const currency = button.dataset.currency;

            pinnedOpen = false;
            setOpen(false);

            await selectCurrency(currency);
        });

        // CLOSE OUTSIDE
        document.addEventListener("click", (event) => {
            if (!dropdown.contains(event.target)) {
                pinnedOpen = false;
                setOpen(false);
            }
        });

        // CLOSE WITH ESCAPE
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                dropdown.classList.remove("is-open");
                pinnedOpen = false;
                toggle.setAttribute("aria-expanded", "false");
                toggle.focus();
            }
        });
    };


    // =========================================
    // INITIALIZE
    // =========================================

    const initializeCurrency = async () => {
        loadCachedRates();

        // If the saved currency has no cached rate, start with USD.
        if (!hasRate(selectedCurrency)) {
            selectedCurrency = "USD";
        }

        updateCurrencyButton();
        updatePrices();

        setupCurrencyDropdown();

        await updateRatesIfNeeded();

        // Refresh rates every 12 hours.
        setInterval(() => {
            updateRatesIfNeeded();
        }, UPDATE_INTERVAL);

        // Refresh when the visitor returns to the page.
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                updateRatesIfNeeded();
            }
        });
    };


    initializeCurrency();

})();
