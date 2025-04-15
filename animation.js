document.addEventListener("DOMContentLoaded", () => {
    const ease = "power4.inOut";

    document.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const href = link.getAttribute("href");

            if (href && !href.startsWith("#") && href !== window.location.pathname) {
               
                animateOutTransition().then(() => {
                    window.location.href = href;
                });
            }
        });
    });


    revealTransition().then(() => {
        gsap.set(".block", { visibility: "hidden" });
    });

    function revealTransition() {
  
        return new Promise((resolve) => {
            gsap.fromTo(
                ".block",
                { scaleY: 1 },
                {
                    scaleY: 0,
                    duration: 1,
                    stagger: {
                        each: 0.1,
                        from: "start",
                        axis: "x",
                    },
                    ease: ease,
                    onComplete: resolve,
                }
            );
        });
    }

    function animateOutTransition() {

        return new Promise((resolve) => {
            gsap.set(".block", { visibility: "visible", scaleY: 0 });
            gsap.to(".block", {
                scaleY: 1,
                duration: 1,
                stagger: {
                    each: 0.1,
                    from: "start",
                    axis: "x",
                },
                ease: ease,
                onComplete: resolve,
            });
        });
    }
});
