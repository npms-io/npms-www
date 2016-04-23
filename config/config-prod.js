import merge from 'lodash/merge';
import baseConfig from './config';

// Configuration for the prod environment goes here,
// including possible overrides to the base configuration

const config = merge({}, baseConfig, {
    env: 'prod',
});

export default config;
