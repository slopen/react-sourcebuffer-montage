'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleStyle = function handleStyle(position) {
	var result = position < 0 ? 0 : position;

	return {
		left: 100 * (result > 1 ? 1 : result) + '%'
	};
};

var relativePosition = function relativePosition(_ref, el) {
	var clientX = _ref.clientX,
	    clientY = _ref.clientY;

	var _el$getBoundingClient = el.getBoundingClientRect(),
	    left = _el$getBoundingClient.left,
	    top = _el$getBoundingClient.top,
	    width = _el$getBoundingClient.width,
	    height = _el$getBoundingClient.height;

	return {
		top: (clientY - top) / height,
		left: (clientX - left) / width
	};
};

var SliceControl = function (_Component) {
	(0, _inherits3.default)(SliceControl, _Component);

	function SliceControl(props) {
		(0, _classCallCheck3.default)(this, SliceControl);

		var _this = (0, _possibleConstructorReturn3.default)(this, (SliceControl.__proto__ || Object.getPrototypeOf(SliceControl)).call(this, props));

		_this.state = {
			position: 0
		};

		_this.onMouseOver = _this.onMouseOver.bind(_this);
		_this.onMouseMove = _this.onMouseMove.bind(_this);
		_this.onMouseOut = _this.onMouseOut.bind(_this);
		_this.onActionClick = _this.onActionClick.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(SliceControl, [{
		key: 'onMouseOver',
		value: function onMouseOver() {
			this.setState({ active: true });
		}
	}, {
		key: 'onMouseMove',
		value: function onMouseMove(_ref2) {
			var _this2 = this;

			var clientX = _ref2.clientX,
			    clientY = _ref2.clientY;

			requestAnimationFrame(function () {
				if (_this2.state.active) {
					var _relativePosition = relativePosition({ clientX: clientX, clientY: clientY }, _this2.refs.control),
					    left = _relativePosition.left,
					    top = _relativePosition.top;

					if (top > 0.5) {
						_this2.updatePosition(left);
					}
				}
			});
		}
	}, {
		key: 'onMouseOut',
		value: function onMouseOut() {
			this.setState({ active: false });
		}
	}, {
		key: 'onActionClick',
		value: function onActionClick(e) {
			var position = this.state.position;
			var _props = this.props,
			    values = _props.values,
			    duration = _props.duration,
			    options = _props.options;


			var value = duration * position;
			var updated = (0, _helpers.insert)(value, values, (0, _extends3.default)({}, options, {
				duration: duration
			}));

			this.props.onChange(updated);

			e.preventDefault();
		}
	}, {
		key: 'updatePosition',
		value: function updatePosition(position) {
			var _props2 = this.props,
			    values = _props2.values,
			    duration = _props2.duration,
			    options = _props2.options;

			var value = duration * position;

			this.setState({
				position: position,
				disabled: !(0, _helpers.canInsert)(values, value, (0, _extends3.default)({}, options, {
					duration: duration
				}))
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    active = _state.active,
			    position = _state.position,
			    disabled = _state.disabled;
			var _props3 = this.props,
			    duration = _props3.duration,
			    formatTimeLabel = _props3.formatTimeLabel;


			return _react2.default.createElement(
				'div',
				{
					ref: 'control',
					className: 'slice-control' + ((active ? ' active' : '') + (disabled ? ' disabled' : '')) },
				_react2.default.createElement('div', { className: 'listener',
					onMouseOver: this.onMouseOver,
					onMouseMove: this.onMouseMove,
					onMouseOut: this.onMouseOut,
					onClick: this.onActionClick }),
				_react2.default.createElement(
					'div',
					{
						style: handleStyle(position),
						className: 'slice-handle' },
					_react2.default.createElement(
						'div',
						{ className: 'slice-tooltip' },
						formatTimeLabel(duration * position * 1000)
					),
					_react2.default.createElement(
						'a',
						{ href: '#', className: 'action' },
						_react2.default.createElement('i', { className: 'fa fa-scissors' })
					)
				)
			);
		}
	}]);
	return SliceControl;
}(_react.Component);

exports.default = SliceControl;