document.addEventListener("DOMContentLoaded", () => {

    /* ========================================
       ELEMENTS
    ======================================== */

    const header = document.getElementById("header");
    const menuButton = document.querySelector(".menu-button");
    const navigation = document.getElementById("global-navigation");
    const navLinks = document.querySelectorAll(".navigation a");
    const revealElements = document.querySelectorAll(".reveal");


    /* ========================================
       HEADER
       スクロール時にヘッダーの状態を変更
    ======================================== */

    const updateHeader = () => {
        if (!header) return;

        if (window.scrollY > 20) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }
    };

    // ページ読み込み時にも実行
    updateHeader();

    // スクロール時
    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* ========================================
       MOBILE MENU
       ハンバーガーメニュー
    ======================================== */

    if (menuButton && navigation) {

        // メニューを開く
        const openMenu = () => {
            menuButton.classList.add("is-active");
            navigation.classList.add("is-open");
            document.body.classList.add("menu-open");

            menuButton.setAttribute("aria-expanded", "true");
            menuButton.setAttribute("aria-label", "メニューを閉じる");
        };


        // メニューを閉じる
        const closeMenu = () => {
            menuButton.classList.remove("is-active");
            navigation.classList.remove("is-open");
            document.body.classList.remove("menu-open");

            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "メニューを開く");
        };


        // メニューボタンをクリック
        menuButton.addEventListener("click", () => {

            const isOpen = menuButton.classList.contains("is-active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        // ナビゲーションをクリックしたらメニューを閉じる
        navLinks.forEach((link) => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });


        // PCサイズに戻ったらメニューを閉じる
        window.addEventListener("resize", () => {

            if (window.innerWidth > 700) {
                closeMenu();
            }

        });

    }


    /* ========================================
       SCROLL REVEAL
       スクロールすると要素を表示
    ======================================== */

    // IntersectionObserverが使えるか確認
    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    // 画面内に入っていなければ何もしない
                    if (!entry.isIntersecting) return;


                    // CSSのアニメーションを開始
                    entry.target.classList.add("is-visible");


                    // 一度表示したら監視を終了
                    observer.unobserve(entry.target);

                });

            },
            {
                // 要素が15%見えたら発火
                threshold: 0.15,

                // 少し早めにアニメーションを開始
                rootMargin: "0px 0px -40px 0px"
            }
        );


        // .revealをすべて監視
        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });


    } else {

        // IntersectionObserver非対応ブラウザ用
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

    }


    /* ========================================
       REDUCED MOTION
       アニメーションを減らしたいユーザーへの対応
    ======================================== */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    if (prefersReducedMotion) {

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

    }


    /* ========================================
       ESC KEY
       Escキーでモバイルメニューを閉じる
    ======================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") return;

        if (
            menuButton &&
            menuButton.classList.contains("is-active")
        ) {

            menuButton.classList.remove("is-active");
            navigation.classList.remove("is-open");
            document.body.classList.remove("menu-open");

            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "メニューを開く");

        }

    });

});
