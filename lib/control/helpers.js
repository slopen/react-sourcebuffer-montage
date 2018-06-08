'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.insert = exports.canInsert = exports.valuesChange = exports.alignPlayProgress = exports.alignPlayStart = exports.inRange = exports.normalize = exports.unpack = exports.pack = exports.rangePrecision = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _lodash = require('lodash.flatten');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rangePrecision = exports.rangePrecision = 0.25;

var pack = exports.pack = function pack(values) {
	return values.reduce(function (result, value, index) {
		if (!(index % 2)) {
			result.push([value, values[index + 1]]);
		}

		return result;
	}, []);
};

var unpack = exports.unpack = _lodash2.default;

var normalize = exports.normalize = function normalize(num) {
	return Number((num || 0).toFixed(6));
};

var inRange = exports.inRange = function inRange(value, _ref) {
	var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
	    start = _ref2[0],
	    end = _ref2[1];

	return normalize(value) >= normalize(start) && normalize(value) <= normalize(end);
};

var alignPlayStart = exports.alignPlayStart = function alignPlayStart(position, values, replay) {
	var start = values[0];

	if (position <= start[0]) {
		return start[0];
	}

	var end = values[values.length - 1];

	if (position >= end[1] - rangePrecision) {
		return replay ? start[0] : end[0];
	}

	var range = values.find(function (range) {
		return position <= range[1] && position >= range[1] - rangePrecision;
	});

	return range ? range[0] : position;
};

var alignPlayProgress = exports.alignPlayProgress = function alignPlayProgress(position, values) {
	var index = values.findIndex(function (range) {
		return position <= range[1] && position >= range[1] - rangePrecision;
	});

	var range = index !== -1 && values[index + 1];

	return range ? range[0] : position;
};

var valuesChange = exports.valuesChange = function valuesChange(values, previous) {
	var position = null;

	for (var i = 0; i < values.length; i++) {
		var range = values[i];
		var prev = previous[i];

		if (prev[0] !== range[0]) {
			return range[0];
		}
		if (prev[1] !== range[1]) {
			return range[1];
		}
	}

	return position;
};

var canInsert = exports.canInsert = function canInsert(values, value, _ref3) {
	var duration = _ref3.duration,
	    maxRangeCount = _ref3.maxRangeCount,
	    insertRangeWidth = _ref3.insertRangeWidth,
	    insertRangeMargin = _ref3.insertRangeMargin;

	var bounds = unpack(values).reduce(function (bounds, next) {
		if (value > next) {
			bounds[0] = next;
		}
		if (value < next && next < bounds[1]) {
			bounds[1] = next;
		}

		return bounds;
	}, [0, duration]);

	return values.length < maxRangeCount && bounds[1] - bounds[0] > insertRangeWidth && bounds[1] - value > insertRangeMargin && bounds[0] - value < -insertRangeMargin;
};

var insert = exports.insert = function insert(value, values, rangeOptions) {
	if (canInsert(values, value, rangeOptions)) {
		var insertRangeWidth = rangeOptions.insertRangeWidth;

		var unpacked = unpack(values);

		unpacked.push(value - insertRangeWidth / 2, value + insertRangeWidth / 2);

		return pack(unpacked.sort(function (a, b) {
			return a - b;
		}));
	}

	return values;
};