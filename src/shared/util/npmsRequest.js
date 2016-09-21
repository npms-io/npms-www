import config from 'config';
import Promise from 'bluebird';
import axios from 'axios';
import isPlainObject from 'lodash/isPlainObject';

function onFullfilled(res) {
    if (!isPlainObject(res.data) && !Array.isArray(res.data)) {
        throw Object.assign(new Error('Unexpected response'),
            { status: res.status, statusText: res.statusText || 'Unknown' });
    }

    return res.data;
}

function onRejected(res) {
    if (res instanceof Error) {
        throw res;
    }

    if (!isPlainObject(res.data) && !Array.isArray(res.data)) {
        throw Object.assign(new Error(`${res.status} - ${res.statusText || 'Unknown'}`),
            { status: res.status, statusText: res.statusText || 'Unknown' });
    }

    throw Object.assign(new Error(res.data.message),
        { status: res.status, statusText: res.statusText || 'Unknown' });
}

export default function npmsRequest(path, options) {
    options = { timeout: config.api.timeout, ...options };

    return Promise.try(() => {
        return axios(`${config.api.url}/${path}`, options)
        .then((res) => onFullfilled(res), (res) => onRejected(res));
    });
}
