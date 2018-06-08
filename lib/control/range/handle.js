'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

var _rcSlider = require('rc-slider');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createStyle = function createStyle(style, index) {
	var handleStyle = Array.isArray(style) ? style[index] || style[0] : style || {};

	return handleStyle;
};

var TooltipHandle = function (_Component) {
	(0, _inherits3.default)(TooltipHandle, _Component);

	function TooltipHandle(props) {
		(0, _classCallCheck3.default)(this, TooltipHandle);

		var _this = (0, _possibleConstructorReturn3.default)(this, (TooltipHandle.__proto__ || Object.getPrototypeOf(TooltipHandle)).call(this, props));

		_this.state = {
			visibles: {}
		};

		_this.visibleChange = _this.visibleChange.bind(_this);
		_this.onMouseEnter = _this.onMouseEnter.bind(_this);
		_this.onMouseLeave = _this.onMouseLeave.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(TooltipHandle, [{
		key: 'visibleChange',
		value: function visibleChange(visible) {
			var index = this.props.index;


			this.setState(function (prevState) {
				return {
					visibles: (0, _extends4.default)({}, prevState.visibles, (0, _defineProperty3.default)({}, index, visible))
				};
			});
		}
	}, {
		key: 'onMouseEnter',
		value: function onMouseEnter() {
			this.visibleChange(true);
		}
	}, {
		key: 'onMouseLeave',
		value: function onMouseLeave() {
			this.visibleChange(false);
		}
	}, {
		key: 'visible',
		value: function visible(dragging) {
			var _props = this.props,
			    disabled = _props.disabled,
			    index = _props.index;

			var visible = this.state.visibles[index] || false;

			return !disabled ? visible || dragging : false;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    value = _props2.value,
			    index = _props2.index,
			    style = _props2.style,
			    dragging = _props2.dragging,
			    tipFormatter = _props2.tipFormatter,
			    handleProps = (0, _objectWithoutProperties3.default)(_props2, ['value', 'index', 'style', 'dragging', 'tipFormatter']);


			return _react2.default.createElement(
				_rcTooltip2.default,
				{
					placement: 'top',
					overlay: tipFormatter(value),
					prefixCls: 'rc-slider-tooltip',
					visible: this.visible(dragging) },
				_react2.default.createElement(
					_rcSlider.Handle,
					(0, _extends4.default)({}, handleProps, {
						value: value,
						style: createStyle(style, index),
						onMouseEnter: this.onMouseEnter,
						onMouseLeave: this.onMouseLeave }),
					index % 2 ? _react2.default.createElement('i', { className: 'fa fa-chevron-right' }) : _react2.default.createElement('i', { className: 'fa fa-chevron-left' })
				)
			);
		}
	}]);
	return TooltipHandle;
}(_react.Component);

exports.default = TooltipHandle;