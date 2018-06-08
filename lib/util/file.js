'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (path) {
	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'arrayBuffer';
	return fetch(path).then(function (res) {
		return res.ok ? res[type]() : Promise.reject(new Error('get file error'));
	});
};