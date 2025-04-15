const slider = document.querySelector(".slider");
const cards = document.querySelectorAll(".card");
const ease = 0.1;
let currentX = 0;
let targetX = 0;

// Linear interpolation function
const lerp = (start, end, t) => {
    return start * (1 - t) + end * t;
};

// Calculate scale factor based on card position and viewport width
const getscalefactor = (position, viewportWidth) => {
    const quarterWidth = viewportWidth / 4;

    if (position < 0 || position > viewportWidth) {
        return 0;
    } else if (position < quarterWidth) {
        return lerp(0, 0.75, position / quarterWidth);
    } else if (position < 2 * quarterWidth) {
        return lerp(0.75, 1.5, (position - quarterWidth) / quarterWidth);
    } else if (position < 3 * quarterWidth) {
        return lerp(1.5, 0.75, (position - 2 * quarterWidth) / quarterWidth);
    } else {
        return lerp(0.75, 0, (position - 3 * quarterWidth) / quarterWidth);
    }
};

// Update the scale of cards based on their position
const updateScales = () => {
    const viewportWidth = window.innerWidth;
    cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const scaleFactor = getscalefactor(cardCenter, viewportWidth);
        const imgScaleFactor = scaleFactor * 1.1;
        const img = card.querySelector(".slides");

        // Apply scaling to the card and its image
        card.style.transform = `scale(${scaleFactor})`;
        if (img) {
            img.style.transform = `scale(${imgScaleFactor})`;
        }
    });
};

// Update animation frame
const update = () => {
    currentX = lerp(currentX, targetX, ease);
    slider.style.transform = `translateX(${currentX}px)`;
    updateScales();
    requestAnimationFrame(update);
};

// Listen for scroll events to adjust target position
window.addEventListener("scroll", () => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = window.scrollY / maxScroll;

    // Adjust scrolling distance and direction for horizontal movement
    const sliderWidth = slider.scrollWidth - window.innerWidth;
    targetX = -scrollProgress * sliderWidth;
});

// Start animation
update();
