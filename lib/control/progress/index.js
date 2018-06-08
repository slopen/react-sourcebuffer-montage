"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var progress = _ref.progress;
	return _react2.default.createElement(
		"div",
		{ className: "loader-bar-gray loader-bar-progress" },
		_react2.default.createElement("div", {
			className: "handle",
			style: { width: progress + "%" } })
	);
};