import 'dom4';
import Promise from 'bluebird';
import { polyfill as smoothscroll } from 'smoothscroll-polyfill';

// Smooth scroll polyfill
smoothscroll();

// Make bluebird global
window.Promise = Promise;

// Improve debugging by enabling long stack traces.. it has minimal impact in production
Promise.config({ longStackTraces: true, warnings: false });
