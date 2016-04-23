import parameters from './parameters.json';

// Common configuration goes here
// Configuration that depends on the environment, should go into config-<env>.js
// Infrastructure related configuration should go into parameters.json

const config = {
    api: {
        url: parameters.apiUrl,
        timeout: 15000,
    },
};

export default config;
