// Monkey patch window.scrollTo (used by `react-router-scroll`) so that scrolling is smooth when
// transitioning between pages.
// This is done by mapping window.scrollTo(x, y) to window.scrollTo({ left: x, top: y, behavior: 'smooth' }) and
// by keeping the body height stable while smooth scrolling

import 'smoothscroll-polyfill';
import wrap from 'lodash/wrap';

const stretcherEl = document.createElement('div');
let cancelOnScrollEnd;

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

    return cleanup;
}

window.scrollTo = wrap(window.scrollTo, (scrollTo, x, y) => {
    if (typeof x === 'number' && typeof y === 'number') {
        stretcherEl.style.height = `${document.body.scrollHeight}px`;
        document.body.appendChild(stretcherEl);

        scrollTo({ left: x, top: y, behavior: 'smooth' });

        cancelOnScrollEnd && cancelOnScrollEnd();
        cancelOnScrollEnd = onScrollEnd(() => {
            cancelOnScrollEnd = null;
            document.body.removeChild(stretcherEl);
        });
    } else {
        scrollTo(x);
    }
});
