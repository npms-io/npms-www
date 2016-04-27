'use strict';

import axios from 'axios';
import config from 'config';
import Promise from 'bluebird';
import isPlainObject from 'lodash/isPlainObject';

function createUrl(path) {
    return `${config.api.url.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

function onFullfilled(res) {
    if (!isPlainObject(res.data)) {
        throw Object.assign(new Error('Unexpected response'),
            { status: res.status, statusText: res.statusText || 'Unknown' });
    }

    return res.data;
}

function onRejected(res) {
    if (res instanceof Error) {
        throw res;
    }

    if (!isPlainObject(res.data)) {
        throw Object.assign(new Error(`${res.status} - ${res.statusText || 'Unknown'}`),
            { status: res.status, statusText: res.statusText || 'Unknown' });
    }

    throw Object.assign(new Error(res.data.message),
        { status: res.status, statusText: res.statusText || 'Unknown' });
}

export default function apiRequest(path, options) {
    options = { timeout: config.api.timeout, ...options };

    return Promise.resolve(axios(createUrl(path), options))
    .timeout(config.api.timeout)
    .then((res) => onFullfilled(res), (res) => onRejected(res));
}
