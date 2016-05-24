/* eslint-env node */
/* eslint camelcase:0 */

'use strict';

const path = require('path');
const assign = require('lodash/assign');
const parameters = require('./parameters.json');
const projectDir = path.resolve(`${__dirname}/..`);

// webpack plugins
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// post css plugins
const autoprefixer = require('autoprefixer');

function buildConfig(options) {
    options = assign({ env: 'dev', minify: null }, options);
    options.minify = options.minify != null ? !!options.minify : options.env !== 'dev';
    const isDev = options.env === 'dev';

    return {
        // ---------------------------------------------------------
        // Webpack configuration
        // ---------------------------------------------------------
        entry: [
            isDev && 'webpack-dev-server/client?/',  // Necessary for hot reloading
            isDev && 'webpack/hot/only-dev-server',  // Necessary for hot reloading
            `${projectDir}/src/bootstrap.js`,

        ].filter((val) => !!val),
        output: {
            path: `${projectDir}/web/build/`,
            publicPath: parameters.publicPath,
            filename: isDev ? '[name].js' : '[name].[hash].js',
            chunkFilename: isDev ? '[name].js' : '[name].[hash].js',
        },
        resolve: {
            alias: {
                config: `${projectDir}/config/config-${options.env}.js`,
                shared: `${projectDir}/src/shared`,
            },
        },
        module: {
            loaders: [
                // Babel loader enables us to use ES2015 + react's JSX
                {
                    test: /\.js$/,
                    include: [`${projectDir}/src`, `${projectDir}/config`],
                    loader: 'babel-loader',
                },
                // Style loader enables us to import CSS files through normal imports
                // We also use postcss-loader so that we can use the awesome autoprefixer
                {
                    test: /\.css$/,
                    include: [`${projectDir}/src`],
                    loader: ExtractTextPlugin.extract('style-loader',
                                'css-loader?importLoaders=1&sourceMap!postcss-loader'),
                },
                // JSON loader so that we can import json files, such as parameters.json
                {
                    test: /\.json$/,
                    include: [`${projectDir}/src`, `${projectDir}/config`],
                    loader: 'json-loader',
                },
                // SVG loader that creates a sprite using symbols
                {
                    test: /\.svg$/,
                    loader: 'svg-sprite-loader?name=svg-[pathhash]-[name]',
                },
                {
                    test: require.resolve('snapsvg'),
                    loader: 'imports-loader?this=>window,fix=>module.exports=0',
                },
            ],
        },
        postcss: () => [
            // Auto prefix CSS based on https://github.com/ai/browserslist
            autoprefixer({ browsers: ['last 2 versions', 'IE >= 11'] }),
        ],
        plugins: [
            // Ensures that hot reloading works
            isDev && new HotModuleReplacementPlugin(),
            // Ensures that files with NO errors are produced
            new NoErrorsPlugin(),
            // Reduce react file size as well as other libraries
            new DefinePlugin({
                'process.env': {
                    NODE_ENV: `"${isDev ? 'development' : 'production'}"`,
                },
            }),
            // Move CSS styles to a separate file
            new ExtractTextPlugin(isDev ? 'app.css' : 'app.[hash].css', {
                allChunks: true,
                disable: isDev,
            }),
            // Minify JS
            options.minify && new UglifyJsPlugin({
                compressor: {
                    warnings: false,
                    drop_console: true,   // Drop console.* statements
                    drop_debugger: true,  // Drop debugger statements
                    screw_ie8: true,      // We don't support IE8 and lower, this further improves compression
                },
            }),
        ].filter((val) => !!val),
        debug: isDev,
        devtool: isDev ? 'cheap-module-source-map' : 'source-map',
        // ---------------------------------------------------------
        // Webpack dev server configuration
        // ---------------------------------------------------------
        devServer: {
            publicPath: parameters.publicPath,
            contentBase: `${projectDir}/web/`,
            filename: 'main.js',
            hot: isDev,                   // Enable HMR in dev
            compress: !isDev,             // Gzip compress when not in dev
            lazy: !isDev,                 // Don't do webpack builds when not in dev
            historyApiFallback: true,     // Allow deep-linking
            stats: {
                chunks: false, children: false, modules: false,
                assets: false, hash: false, timings: false, version: false,
            },
            // API proxies to circumvent CORS issues while developing
            // See available options in https://github.com/nodejitsu/node-http-proxy
            proxy: {
                '/api/*': {
                    target: 'https://api.npms.io/',
                    headers: { host: 'api.npms.io' },
                    rewrite: (req) => {
                        req.url = req.url.replace(/^\/api/, '');
                    },
                },
            },
        },
    };
}


// Do some trickery to export the config based on the running script name
// This allows us to use the webpack executable directly as well as supporting
// building the configuration dynamically
const isWebpackExecutable = /^webpack\-?/.test(path.basename(process.argv[1]));

module.exports = isWebpackExecutable ? buildConfig(require('yargs').argv) : buildConfig;
