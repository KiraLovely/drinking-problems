
// --------- Smooth scroll for Banner bar, mouse drag and mobile support ---------

(function () {
    const scroller = document.getElementById('scroller');

    /* Mouse drag to scroll */
    let isDown = false;
    let startX;
    let scrollLeft;

    scroller.addEventListener('mousedown', (e) => {
        isDown = true;
        scroller.classList.add('dragging');
        // pageX includes document scroll; offsetLeft accounts for container offset
        startX = e.pageX - scroller.offsetLeft;
        scrollLeft = scroller.scrollLeft;
        // Prevent text selection / native drag behavior
        e.preventDefault();
    });

    scroller.addEventListener('mouseleave', () => {
        isDown = false;
        scroller.classList.remove('dragging');
    });

    scroller.addEventListener('mouseup', () => {
        isDown = false;
        scroller.classList.remove('dragging');
    });

    scroller.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        // how far the pointer moved
        const x = e.pageX - scroller.offsetLeft;
        const walk = (x - startX); // positive when moving right
        scroller.scrollLeft = scrollLeft - walk;
    });

    /* Touch support: start + move (touch naturally scrolls; this is to make behavior consistent) */
    scroller.addEventListener('touchstart', (e) => {
        // fallback when touch triggers JavaScript-based drag behavior (not usually needed)
        startX = e.touches[0].pageX - scroller.offsetLeft;
        scrollLeft = scroller.scrollLeft;
        // don't set isDown to true; native touch scrolling is fine, but this allows JS touchmove control if desired
    }, {passive: true});

    scroller.addEventListener('touchmove', (e) => {
        // optionally allow JS-based touch dragging by uncommenting below and change passive to false on touchstart
        // const x = e.touches[0].pageX - scroller.offsetLeft;
        // const walk = (x - startX);
        // scroller.scrollLeft = scrollLeft - walk;
    }, {passive: true});

    /* Keyboard accessibility: arrow keys, PageLeft/PageRight, Home/End */
    scroller.addEventListener('keydown', (e) => {
        const step = 100; // px per arrow press
        switch (e.key) {
            case 'ArrowRight':
                scroller.scrollBy({ left: step, behavior: 'smooth' });
                e.preventDefault();
                break;
            case 'ArrowLeft':
                scroller.scrollBy({ left: -step, behavior: 'smooth' });
                e.preventDefault();
                break;
            case 'PageDown':
            case 'PageUp':
                scroller.scrollBy({ left: (e.key === 'PageDown' ? scroller.clientWidth : -scroller.clientWidth), behavior: 'smooth' });
                e.preventDefault();
                break;
            case 'Home':
                scroller.scrollTo({ left: 0, behavior: 'smooth' });
                e.preventDefault();
                break;
            case 'End':
                scroller.scrollTo({ left: scroller.scrollWidth, behavior: 'smooth' });
                e.preventDefault();
                break;
        }
    });

    scroller.addEventListener('wheel', (e) => {
        // If user scrolls vertically, translate to horizontal scroll so trackpad/wheel works nicely.
        if (!e.shiftKey) {
            // translate vertical delta to horizontal scroll
            scroller.scrollLeft += e.deltaY + e.deltaX;
            e.preventDefault();
        }
    }, { passive: false });

})();