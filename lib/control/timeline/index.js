'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _background = require('../../util/background');

var _background2 = _interopRequireDefault(_background);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clipStyle = function clipStyle(_ref, duration) {
	var start = _ref.start,
	    end = _ref.end;
	return duration ? {
		width: 100 * ((end - start) / duration) + '%'
	} : null;
};

var Clip = function Clip(_ref2) {
	var data = _ref2.data,
	    duration = _ref2.duration;
	return _react2.default.createElement(_background2.default, {
		className: 'clip',
		src: data.thumbnail,
		style: clipStyle(data, duration) });
};

exports.default = function (_ref3) {
	var data = _ref3.data,
	    duration = _ref3.duration;

	if (!data) {
		return null;
	}

	return _react2.default.createElement(
		'div',
		{ className: 'timeline' },
		data.map(function (item, index) {
			return _react2.default.createElement(Clip, {
				key: index,
				data: item,
				duration: duration });
		})
	);
};