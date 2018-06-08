'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var backgroundStyle = function backgroundStyle(url, style) {
	return url ? (0, _extends3.default)({}, url ? { backgroundImage: 'url(' + url + ')' } : {}, style) : null;
};

var SecureBackground = function (_Component) {
	(0, _inherits3.default)(SecureBackground, _Component);

	function SecureBackground(props) {
		(0, _classCallCheck3.default)(this, SecureBackground);

		var _this = (0, _possibleConstructorReturn3.default)(this, (SecureBackground.__proto__ || Object.getPrototypeOf(SecureBackground)).call(this, props));

		_this.state = {};
		return _this;
	}

	(0, _createClass3.default)(SecureBackground, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.mounted = true;

			(0, _file2.default)(this.props.src, 'blob').then(function (data) {
				return _this2.safeState({
					data: URL.createObjectURL(data)
				});
			}).catch(function (error) {
				return _this2.safeState({ error: error });
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.mounted = false;
			URL.revokeObjectURL(this.state.data);
		}
	}, {
		key: 'safeState',
		value: function safeState(state) {
			if (this.mounted) {
				this.setState(state);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			// eslint-disable-next-line no-unused-vars
			var _props = this.props,
			    src = _props.src,
			    style = _props.style,
			    props = (0, _objectWithoutProperties3.default)(_props, ['src', 'style']);
			var data = this.state.data;


			return _react2.default.createElement('div', (0, _extends3.default)({ style: backgroundStyle(data, style) }, props));
		}
	}]);
	return SecureBackground;
}(_react.Component);

exports.default = SecureBackground;