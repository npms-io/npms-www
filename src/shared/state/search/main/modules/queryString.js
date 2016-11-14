import queryString from 'query-string';
import forIn from 'lodash/forIn';
import kebabCase from 'lodash/kebabCase';

export function buildForApp(q, settings) {
    forIn(settings.current, (value, name) => {
        const hyphenatedName = kebabCase(name);
        const regExp = new RegExp(`\\s?${hyphenatedName}:([^\\s]+)`);
        const match = q.match(regExp);
        const queryValue = match ? match[1] : value.toString();

        q = q.replace(regExp, '');

        if (settings.defaults[name].toString() !== queryValue || value.toString() !== queryValue) {
            q += ` ${hyphenatedName}:${queryValue}`;
        }
    });

    q = q.trim();

    if (!q) {
        return '';
    }

    return queryString.stringify({ q }).replace(/%20/g, '+');  // Replace spaces with + because it's prettier
}

export function buildForApi(params, settings) {
    const queryObject = { ...params };

    forIn(settings.current, (value, name) => {
        const hyphenatedName = kebabCase(name);
        const regExp = new RegExp(`${hyphenatedName}:[^\\s]+`);

        if (!regExp.test(params.q)) {
            queryObject.q += ` ${hyphenatedName}:${value}`;
        }
    });

    queryObject.q = queryObject.q.trim();

    return queryString.stringify(queryObject);
}
