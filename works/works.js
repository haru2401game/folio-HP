/* ========================================
   WORKS DETAIL PAGE
   完全独立JavaScript
======================================== */


document.addEventListener("DOMContentLoaded", () => {


    /* ========================================
       ELEMENTS
    ======================================== */

    const header =
        document.querySelector(".header");

    const menuButton =
        document.querySelector(".menu-button");

    const navigation =
        document.querySelector(".navigation");

    const revealElements =
        document.querySelectorAll(".reveal");

    const galleryImages =
        document.querySelectorAll(
            ".work-gallery img, .work-detail-main-image img"
        );

    const backToTop =
        document.querySelector(".footer__top");


    /* ========================================
       HEADER
    ======================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 20) {

            header.classList.add(
                "is-scrolled"
            );

        } else {

            header.classList.remove(
                "is-scrolled"
            );

        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* ========================================
       MOBILE MENU
    ======================================== */

    function closeMenu() {

        if (!menuButton || !navigation) {
            return;
        }

        menuButton.classList.remove(
            "is-open"
        );

        navigation.classList.remove(
            "is-open"
        );

        document.body.classList.remove(
            "menu-open"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "メニューを開く"
        );

    }


    if (
        menuButton &&
        navigation
    ) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    menuButton.classList.toggle(
                        "is-open"
                    );


                navigation.classList.toggle(
                    "is-open",
                    isOpen
                );


                document.body.classList.toggle(
                    "menu-open",
                    isOpen
                );


                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                menuButton.setAttribute(
                    "aria-label",
                    isOpen
                        ? "メニューを閉じる"
                        : "メニューを開く"
                );

            }
        );


        navigation
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMenu();

                    }
                );

            });

    }


    /* ========================================
       REVEAL ANIMATION
    ======================================== */

    if (
        revealElements.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.1,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                observer.observe(
                    element
                );

            }
        );

    } else {

        /*
         * IntersectionObserverが
         * 使用できない環境では
         * すべて表示する
         */

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    }


    /* ========================================
       LIGHTBOX
    ======================================== */

    let lightbox = null;


    function createLightbox() {

        if (lightbox) {
            return;
        }


        lightbox =
            document.createElement("div");


        lightbox.className =
            "work-lightbox";


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        lightbox.innerHTML = `

            <div
                class="work-lightbox__backdrop"
            ></div>


            <div
                class="work-lightbox__content"
                role="dialog"
                aria-modal="true"
                aria-label="画像拡大表示"
            >

                <button
                    type="button"
                    class="work-lightbox__close"
                    aria-label="画像を閉じる"
                >

                    <span></span>
                    <span></span>

                </button>


                <img
                    class="work-lightbox__image"
                    src=""
                    alt=""
                >

            </div>

        `;


        document.body.appendChild(
            lightbox
        );


        /* Close button */

        const closeButton =
            lightbox.querySelector(
                ".work-lightbox__close"
            );


        closeButton.addEventListener(
            "click",
            closeLightbox
        );


        /* Backdrop */

        const backdrop =
            lightbox.querySelector(
                ".work-lightbox__backdrop"
            );


        backdrop.addEventListener(
            "click",
            closeLightbox
        );

    }


    function openLightbox(image) {

        createLightbox();


        const lightboxImage =
            lightbox.querySelector(
                ".work-lightbox__image"
            );


        lightboxImage.src =
            image.currentSrc ||
            image.src;


        lightboxImage.alt =
            image.alt || "";


        lightbox.classList.add(
            "is-open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "lightbox-open"
        );


        const closeButton =
            lightbox.querySelector(
                ".work-lightbox__close"
            );


        closeButton.focus();

    }


    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "is-open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "lightbox-open"
        );

    }


    /* ========================================
       IMAGE CLICK
    ======================================== */

    galleryImages.forEach(
        (image) => {

            image.addEventListener(
                "click",
                () => {

                    openLightbox(
                        image
                    );

                }
            );

        }
    );


    /* ========================================
       KEYBOARD
    ======================================== */

    document.addEventListener(
        "keydown",
        (event) => {


            /* ESC */

            if (
                event.key === "Escape"
            ) {

                if (
                    lightbox &&
                    lightbox.classList.contains(
                        "is-open"
                    )
                ) {

                    closeLightbox();

                    return;

                }


                if (
                    menuButton &&
                    menuButton.classList.contains(
                        "is-open"
                    )
                ) {

                    closeMenu();

                }

            }


            /* ENTER / SPACE */

            if (
                lightbox &&
                lightbox.classList.contains(
                    "is-open"
                )
            ) {

                return;

            }

        }
    );


    /* ========================================
       BACK TO TOP
    ======================================== */

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                window.scrollTo({
                    top: 0,

                    behavior: "smooth"
                });

            }
        );

    }


    /* ========================================
       PLACEHOLDER LINKS
    ======================================== */

    /*
     * href="#" の仮リンクについて、
     * ページ上部へ飛ばないようにする。
     *
     * 実際のURLを設定したリンクには
     * 影響しません。
     */

    const placeholderLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    placeholderLinks.forEach(
        (link) => {

            if (
                link.classList.contains(
                    "footer__top"
                )
            ) {
                return;
            }


            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                }
            );

        }
    );


    /* ========================================
       WINDOW RESIZE
    ======================================== */

    window.addEventListener(
        "resize",
        () => {

            /*
             * PC幅に戻ったとき、
             * モバイルメニューを閉じる。
             */

            if (
                window.innerWidth > 767 &&
                menuButton &&
                menuButton.classList.contains(
                    "is-open"
                )
            ) {

                closeMenu();

            }

        }
    );


});