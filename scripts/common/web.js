'use strict';

const fs = require('fs');
const rimraf = require('rimraf');

const template = require('lodash/template');
const minifyHtml = require('html-minifier').minify;

const projectDir = `${__dirname}/../..`;

function cleanBuild() {
    process.stdout.write('Cleaning previous build..\n');

    rimraf.sync(`${projectDir}/web/build`);
    rimraf.sync(`${projectDir}/web/index.html`);
}

function generateIndex(data, minify) {
    process.stdout.write('Generating index..\n');

    const tmpl = template(fs.readFileSync(`${projectDir}/web/.index.html`));
    let index;

    // Generate the index based on the template
    index = tmpl(data);

    // Minify the HTML
    if (minify) {
        index = minifyHtml(index, {
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            keepClosingSlash: true,
            minifyJS: true,
        });
    // Otherwise clean the empty lines left over from the template
    } else {
        index = index
        .split('\n')
        .filter((line) => !/^\s+$/.test(line))
        .join('\n');
    }

    fs.writeFileSync(`${projectDir}/web/index.html`, index);
}

module.exports = {
    cleanBuild,
    generateIndex,
};
