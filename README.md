# npms-www

[![Build Status][travis-image]][travis-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

The https://npms.io website.


## Installation

`$ npm install`


## Development

Simply spawn the server by running `$ npm run serve`. This will create a server defaulting to the `dev` environment.
You may preview the production build by running `$ npm run build && npm run serve -- --env prod`.


## Deploys

There's a separate document that explains the deployment procedure, you may read it [here](./docs/deploys.md).


## Tests

```bash
$ npm test
$ npm test-cov # to get coverage report
```


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).


[david-dm-dev-image]: https://img.shields.io/david/dev/npms-io/npms-www.svg
[david-dm-dev-url]: https://david-dm.org/npms-io/npms-www#info=devDependencies
[david-dm-image]: https://img.shields.io/david/npms-io/npms-www.svg
[david-dm-url]: https://david-dm.org/npms-io/npms-www
[travis-image]: http://img.shields.io/travis/npms-io/npms-www.svg
[travis-url]: https://travis-ci.org/npms-io/npms-www
