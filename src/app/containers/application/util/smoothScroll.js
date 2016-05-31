/* eslint no-inner-declarations:0 */

/**
 * Monkey patch window.scrollTo (used by `react-router-scroll`) so that scrolling is smooth when
 * transitioning between pages. This is done by mapping window.scrollTo(x, y) to
 * window.scrollTo({ left: x, top: y, behavior: 'smooth' }) and by keeping the body height stable while smooth scrolling.
 * We avoid doing this for browsers that do not support history.scrollRestoration because they cause a white flash
 */

import wrap from 'lodash/wrap';

const canSmoothScroll = typeof history.scrollRestoration === 'string';

if (canSmoothScroll) {
    const stretcherEl = (() => {
        const el = document.createElement('div');

        el.style.cssText = 'position: absolute; top: 0; right: 0; left: 0; pointer-events: none';

        return el;
    })();

    function onScrollEnd(callback) {
        let timeout;

        function handleScroll() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                cleanup();
                callback();
            }, 500);
        }

        function cleanup() {
            timeout && clearTimeout(timeout);
            window.removeEventListener('scroll', handleScroll);
        }

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return cleanup;
    }

    let cancelOnScrollEnd;

    window.scrollTo = wrap(window.scrollTo, (scrollTo, x, y) => {
        if (typeof x === 'number' && typeof y === 'number') {
            stretcherEl.style.height = `${document.body.scrollHeight}px`;
            document.body.appendChild(stretcherEl);

            scrollTo({ left: x, top: y, behavior: 'smooth' });

            cancelOnScrollEnd && cancelOnScrollEnd();
            cancelOnScrollEnd = onScrollEnd(() => {
                cancelOnScrollEnd = null;
                stretcherEl.parentNode && document.body.removeChild(stretcherEl);
            });
        } else {
            scrollTo(x);
        }
    });
}

export { canSmoothScroll };
