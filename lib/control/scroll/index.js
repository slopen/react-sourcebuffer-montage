"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var seconds2Px = 5;
var scrollDuration = 249;

var easing = function easing(t) {
	return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

var scrollElement = function scrollElement(element, scroll) {
	var start = null;

	var scrollLeft = element.scrollLeft;
	var diff = scroll - scrollLeft;

	requestAnimationFrame(function step(timestamp) {
		if (!start) {
			start = timestamp;
		}

		var time = timestamp - start;
		var percent = easing(Math.min(time / scrollDuration, 1));

		element.scrollLeft = scrollLeft + diff * percent;

		if (time < scrollDuration) {
			requestAnimationFrame(step);
		}
	});
};

var scrollPosition = function scrollPosition(element, position) {
	var width = element.clientWidth;

	var offset = seconds2Px * position - width / 2;

	scrollElement(element, offset < 0 ? 0 : offset);
};

var wrapStyle = function wrapStyle(duration) {
	return {
		width: duration * seconds2Px + "px"
	};
};

var ScrollLeft = function (_Component) {
	(0, _inherits3.default)(ScrollLeft, _Component);

	function ScrollLeft() {
		(0, _classCallCheck3.default)(this, ScrollLeft);
		return (0, _possibleConstructorReturn3.default)(this, (ScrollLeft.__proto__ || Object.getPrototypeOf(ScrollLeft)).apply(this, arguments));
	}

	(0, _createClass3.default)(ScrollLeft, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(_ref) {
			var position = _ref.position;
			var scrollable = this.refs.scrollable;


			if (scrollable && this.props.position !== position) {
				scrollPosition(scrollable, position);
			}
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{
					ref: "scrollable",
					className: "control-container" },
				_react2.default.createElement(
					"div",
					{
						className: "wrap",
						style: wrapStyle(this.props.duration) },
					this.props.children
				)
			);
		}
	}]);
	return ScrollLeft;
}(_react.Component);

exports.default = ScrollLeft;