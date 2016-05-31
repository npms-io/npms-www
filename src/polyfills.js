import 'dom4';
import Promise from 'bluebird';
import { polyfill as smoothscroll } from 'smoothscroll-polyfill/src/smoothscroll';

smoothscroll();
window.Promise = Promise;
