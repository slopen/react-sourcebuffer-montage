'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcSlider = require('rc-slider');

var _helpers = require('../helpers');

var _handle = require('./handle');

var _handle2 = _interopRequireDefault(_handle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateChange = function validateChange(values, previous, onChange) {
	var packed = (0, _helpers.pack)(values);
	var changed = (0, _helpers.valuesChange)(packed, previous);

	if (changed !== null) {
		onChange(packed, changed);
	}
};

var handle = function handle(total, formatTimeLabel) {
	return function (props) {
		return _react2.default.createElement(_handle2.default, (0, _extends3.default)({}, props, {
			total: total,
			key: props.index,
			tipFormatter: function tipFormatter(ts) {
				return formatTimeLabel(ts * 1000);
			} }));
	};
};

exports.default = function (_ref) {
	var values = _ref.values,
	    duration = _ref.duration,
	    _onChange = _ref.onChange,
	    formatTimeLabel = _ref.formatTimeLabel;

	var value = (0, _helpers.unpack)(values);
	var count = value.length;

	return typeof duration !== 'undefined' ? _react2.default.createElement(
		'div',
		{ className: 'range-control' },
		_react2.default.createElement(_rcSlider.Range, {
			min: 0,
			max: Math.floor(duration),
			step: 0.5,
			pushable: 0.5,
			included: true,
			terminals: true,
			allowAcross: false,
			count: count,
			value: value,
			tipFormatter: formatTimeLabel,
			handle: handle(count, formatTimeLabel),
			onChange: function onChange(updated) {
				return validateChange(updated, values, _onChange);
			} })
	) : null;
};