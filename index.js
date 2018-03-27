'use strict';

const Fettuccine = require('fettuccine-class');

const fettuccineInstance = new Fettuccine();

module.exports = function fettuccine(url, options) {
	return fettuccineInstance.get(url, options);
};

module.exports.get = module.exports;

for (const methodName of [
	'POST',
	'PUT',
	'PATCH',
	'HEAD',
	'DELETE'
]) {
	module.exports[methodName.toLowerCase()] = (url, options) => module.exports(url, Object.assign({}, options, {
		method: methodName
	}));
}

module.exports.Fettuccine = Fettuccine;
