'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.debounce');

var _lodash4 = _interopRequireDefault(_lodash3);

var _play = require('./play');

var _play2 = _interopRequireDefault(_play);

var _source = require('./source');

var _helpers = require('../control/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VideoPreview = function (_Component) {
	(0, _inherits3.default)(VideoPreview, _Component);

	function VideoPreview(props) {
		(0, _classCallCheck3.default)(this, VideoPreview);

		var _this = (0, _possibleConstructorReturn3.default)(this, (VideoPreview.__proto__ || Object.getPrototypeOf(VideoPreview)).call(this, props));

		_this.state = {
			paused: true
		};

		_this.prepareBuffer = (0, _lodash2.default)(_this.prepareBuffer, 249).bind(_this);
		_this.updatePaused = (0, _lodash4.default)(_this.updatePaused, 636).bind(_this);

		_this.onVideoPause = _this.onVideoPause.bind(_this);
		_this.onVideoPlay = _this.onVideoPlay.bind(_this);
		_this.onVideoTimeupdate = _this.onVideoTimeupdate.bind(_this);
		_this.onVideoToggle = _this.onVideoToggle.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(VideoPreview, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._mounted = true;
			this.init();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this._mounted = false;
		}
	}, {
		key: 'safeState',
		value: function safeState(state, cb) {
			if (this._mounted) {
				this.setState(state, cb);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(_ref) {
			var currentTime = _ref.currentTime,
			    interactive = _ref.interactive;
			var previousInt = this.props.interactive;
			var previousTime = this.props.currentTime;


			if (interactive !== previousInt) {
				this.onInteractiveChange(interactive);
			}
			if (previousTime !== currentTime) {
				this.onPositionChange(currentTime);
			}
		}
	}, {
		key: 'init',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;
								_context.next = 3;
								return this.initVideo();

							case 3:
								_context.next = 5;
								return this.initSource();

							case 5:
								_context.next = 10;
								break;

							case 7:
								_context.prev = 7;
								_context.t0 = _context['catch'](0);

								this.props.onVideoError(_context.t0);

							case 10:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[0, 7]]);
			}));

			function init() {
				return _ref2.apply(this, arguments);
			}

			return init;
		}()
	}, {
		key: 'initVideo',
		value: function () {
			var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
				var _this2 = this;

				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								return _context2.abrupt('return', new Promise(function (resolve, reject) {
									try {
										var video = _this2.refs.video;


										_this2.mediaSource = new MediaSource();
										_this2.mediaSource.onerror = reject;
										_this2.mediaSource.onsourceopen = resolve;
										_this2.videoURL = URL.createObjectURL(_this2.mediaSource);

										video.onerror = reject;
										video.onclick = _this2.onVideoToggle;
										video.onplay = _this2.onVideoPlay;
										video.onpause = _this2.onVideoPause;
										video.onseeking = _this2.onVideoTimeupdate;
										video.ontimeupdate = _this2.onVideoTimeupdate;
										video.src = _this2.videoURL;
									} catch (e) {
										reject(e);
									}
								}));

							case 1:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function initVideo() {
				return _ref3.apply(this, arguments);
			}

			return initVideo;
		}()
	}, {
		key: 'initSource',
		value: function () {
			var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
				var video, mediaSource, _props, files, videoCodecs, onVideoProgress, filesData;

				return _regenerator2.default.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								video = this.refs.video;
								mediaSource = this.mediaSource;
								_props = this.props, files = _props.files, videoCodecs = _props.videoCodecs, onVideoProgress = _props.onVideoProgress;


								URL.revokeObjectURL(this.videoURL);

								_context3.next = 6;
								return (0, _source.getFilesData)({
									files: files,
									mediaSource: mediaSource,
									videoCodecs: videoCodecs,
									onVideoProgress: onVideoProgress
								});

							case 6:
								filesData = _context3.sent;


								this.safeState({ filesData: filesData });
								this.props.onVideoReady(filesData, video);

							case 9:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function initSource() {
				return _ref4.apply(this, arguments);
			}

			return initSource;
		}()
	}, {
		key: 'prepareBuffer',
		value: function prepareBuffer(position) {
			var _this3 = this;

			var mediaSource = this.mediaSource;
			var filesData = this.state.filesData;


			var update = function update() {
				return (0, _source.prepareSourceBuffer)({
					mediaSource: mediaSource,
					position: position,
					filesData: filesData
				});
			};

			return (this._buffering ? this._buffering.then(update) : this._buffering = update()).then(function () {
				return delete _this3._buffering;
			});
		}
	}, {
		key: 'onVideoToggle',
		value: function () {
			var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
				var video, values, paused, interactive, position, aligned;
				return _regenerator2.default.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								video = this.refs.video;
								values = this.props.values;
								paused = video.paused;

								if (!paused) {
									_context4.next = 13;
									break;
								}

								interactive = this.props.interactive;
								position = video.currentTime;
								aligned = (0, _helpers.alignPlayStart)(position, values, interactive);


								this.safeState({ interactive: true });
								_context4.next = 10;
								return this.prepareBuffer(aligned);

							case 10:

								if (position !== aligned) {
									video.onseeked = function () {
										video.onseeked = null;
										video.play();
									};

									video.currentTime = aligned;
								} else {
									video.play();
								}
								_context4.next = 14;
								break;

							case 13:
								video.pause();

							case 14:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function onVideoToggle() {
				return _ref5.apply(this, arguments);
			}

			return onVideoToggle;
		}()
	}, {
		key: 'onVideoPause',
		value: function onVideoPause() {
			this.updatePaused(true);
		}
	}, {
		key: 'onVideoPlay',
		value: function onVideoPlay() {
			this.updatePaused(false);
		}
	}, {
		key: 'onVideoTimeupdate',
		value: function () {
			var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref7) {
				var video = _ref7.target;

				var values, position, _values, end, aligned;

				return _regenerator2.default.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								values = this.props.values;
								position = video.currentTime;

								if (video.paused) {
									_context5.next = 11;
									break;
								}

								_values = (0, _slicedToArray3.default)(values[values.length - 1], 2), end = _values[1];

								if (!(position > end - _helpers.rangePrecision)) {
									_context5.next = 6;
									break;
								}

								return _context5.abrupt('return', video.pause());

							case 6:
								aligned = (0, _helpers.alignPlayProgress)(position, values);
								_context5.next = 9;
								return this.prepareBuffer(aligned);

							case 9:

								if (aligned !== position) {
									video.currentTime = aligned;
								}

								this.props.onVideoTimeupdate(video.currentTime);

							case 11:
							case 'end':
								return _context5.stop();
						}
					}
				}, _callee5, this);
			}));

			function onVideoTimeupdate(_x) {
				return _ref6.apply(this, arguments);
			}

			return onVideoTimeupdate;
		}()
	}, {
		key: 'onPositionChange',
		value: function () {
			var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(position) {
				var video;
				return _regenerator2.default.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								video = this.refs.video;

								if (!(!video || typeof position !== 'number')) {
									_context6.next = 3;
									break;
								}

								return _context6.abrupt('return');

							case 3:
								if (!(video.currentTime !== position)) {
									_context6.next = 7;
									break;
								}

								_context6.next = 6;
								return this.prepareBuffer(position);

							case 6:
								video.currentTime = position;

							case 7:
							case 'end':
								return _context6.stop();
						}
					}
				}, _callee6, this);
			}));

			function onPositionChange(_x2) {
				return _ref8.apply(this, arguments);
			}

			return onPositionChange;
		}()
	}, {
		key: 'onInteractiveChange',
		value: function onInteractiveChange(interactive) {
			var video = this.refs.video;


			if (!interactive && video && !video.paused) {
				video.pause();
			}
		}
	}, {
		key: 'updatePaused',
		value: function updatePaused(paused) {
			this.safeState({ paused: paused });
		}
	}, {
		key: 'render',
		value: function render() {
			var files = this.props.files;
			var paused = this.state.paused;


			return files ? _react2.default.createElement(
				'div',
				{ className: 'video-container' },
				_react2.default.createElement('video', { id: 'video', ref: 'video' }),
				_react2.default.createElement(_play2.default, { paused: paused })
			) : _react2.default.createElement(
				'div',
				{ className: 'video-container loading' },
				_react2.default.createElement('div', { className: 'loader-bar-gray' })
			);
		}
	}]);
	return VideoPreview;
}(_react.Component);

exports.default = VideoPreview;