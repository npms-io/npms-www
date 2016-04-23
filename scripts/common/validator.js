'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const errcode = require('err-code');
const diff = require('diff-json-structure');

const projectDir = `${__dirname}/../../`;

function validateEnvironment(env) {
    try {
        fs.statSync(`${projectDir}/config/config-${env}.js`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw errcode(`Environment ${env} does not exist`,
                { detail: `You must create its configuration file at config/config-${env}.js` });
        }

        throw err;
    }

    process.stdout.write(`Environment ${env} environment is valid.\n`);
}

function validateParameters(parameters) {
    const distParameters = JSON.parse(fs.readFileSync(`${projectDir}config/parameters.json.dist`));
    const diffParts = diff(distParameters, parameters);
    const isDifferent = diffParts.some((part) => part.added || part.removed);

    if (!isDifferent) {
        return process.stdout.write('Parameters are valid.\n');
    }

    let errDetail = '';

    diffParts.forEach((part) => {
        part.value
        .split('\n')
        .filter((line) => !!line)
        .forEach((line) => {
            if (part.added) {
                errDetail += chalk.green(`+  ${line}`);
            } else if (part.removed) {
                errDetail += chalk.red(`-  ${line}`);
            } else {
                errDetail += chalk.dim(`   ${line}`);
            }

            errDetail += '\n';
        });
    });

    errDetail += '\n\nPlease apply the changes according to the diff above.';

    throw errcode('config/parameters.json.dist was modified recently and \
contains differences compared to config/parameters.json', { detail: errDetail });
}

function validateBuild() {
    try {
        fs.statSync(`${projectDir}/web/build`);
        fs.statSync(`${projectDir}/web/index.html`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw errcode(`No build was found in ${path.relative(process.cwd(), `${projectDir}/web`)}`,
                { detail: 'Please build the project before' });
        }

        throw err;
    }

    process.stdout.write('Build was found.\n');
}

module.exports = {
    validateEnvironment,
    validateParameters,
    validateBuild,
};
