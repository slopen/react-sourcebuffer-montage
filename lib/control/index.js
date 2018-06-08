'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _timeline = require('./timeline');

var _timeline2 = _interopRequireDefault(_timeline);

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

var _slice = require('./slice');

var _slice2 = _interopRequireDefault(_slice);

var _playback = require('./playback');

var _playback2 = _interopRequireDefault(_playback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var values = _ref.values,
	    position = _ref.position,
	    duration = _ref.duration,
	    filesData = _ref.filesData,
	    interactive = _ref.interactive,
	    onPositionChange = _ref.onPositionChange,
	    onRangeChange = _ref.onRangeChange,
	    sliceOptions = _ref.sliceOptions,
	    formatTimeLabel = _ref.formatTimeLabel;
	return _react2.default.createElement(
		'div',
		{ className: 'montage-controls' },
		_react2.default.createElement(_timeline2.default, {
			data: filesData,
			duration: duration }),
		_react2.default.createElement(_slice2.default, {
			values: values,
			duration: duration,
			onChange: onRangeChange,
			options: sliceOptions,
			formatTimeLabel: formatTimeLabel }),
		_react2.default.createElement(_range2.default, {
			values: values,
			duration: duration,
			onChange: onRangeChange,
			formatTimeLabel: formatTimeLabel }),
		_react2.default.createElement(_playback2.default, {
			values: values,
			active: interactive,
			position: position,
			duration: duration,
			onChange: onPositionChange,
			formatTimeLabel: formatTimeLabel })
	);
};