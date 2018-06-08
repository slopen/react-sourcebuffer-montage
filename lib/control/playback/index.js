'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayBackItem = function PlayBackItem(_ref) {
	var end = _ref.end,
	    start = _ref.start,
	    active = _ref.active,
	    _ref$duration = _ref.duration,
	    duration = _ref$duration === undefined ? 0 : _ref$duration,
	    _ref$position = _ref.position,
	    position = _ref$position === undefined ? start : _ref$position,
	    onChange = _ref.onChange;

	var display = active && (0, _helpers.inRange)(position, [start, end]);

	return _react2.default.createElement(
		'div',
		{ className: 'playback-control' + (display ? '' : ' disabled'), style: {
				left: 100 * (start / duration) + '%',
				right: 100 - 100 * end / duration + '%'
			} },
		_react2.default.createElement(_rcSlider2.default, {
			max: end,
			min: start,
			step: 0.5,
			onChange: onChange,
			defaultValue: start,
			value: display ? position : start })
	);
};

exports.default = function (_ref2) {
	var active = _ref2.active,
	    values = _ref2.values,
	    duration = _ref2.duration,
	    position = _ref2.position,
	    onChange = _ref2.onChange;
	return values ? values.map(function (_ref3, key) {
		var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
		    start = _ref4[0],
		    end = _ref4[1];

		return _react2.default.createElement(PlayBackItem, {
			key: key,
			start: start,
			end: end,
			active: active,
			duration: duration,
			position: position,
			onChange: onChange });
	}) : null;
};