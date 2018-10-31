'use strict';

const Fettuccine = require('fettuccine-class');

const fettuccine = new Fettuccine({});

module.exports = fettuccine.fetch.bind(fettuccine);

for (const methodName of [
	'delete',
	'patch',
	'post',
	'put',
	'head'
]) {
	Object.defineProperty(module.exports, methodName, {
		value: fettuccine[methodName].bind(fettuccine),
		enumerable: true
	});
}

Object.defineProperties(module.exports, {
	CACHE_DIR: {
		value: Fettuccine.CACHE_DIR,
		enumerable: true
	},
	MINIMUM_REQUIRED_NPM_VERSION: {
		value: Fettuccine.MINIMUM_REQUIRED_NPM_VERSION,
		enumerable: true
	}
});
