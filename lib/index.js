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

var _video = require('./video');

var _video2 = _interopRequireDefault(_video);

var _control = require('./control');

var _control2 = _interopRequireDefault(_control);

var _scroll = require('./control/scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _progress = require('./control/progress');

var _progress2 = _interopRequireDefault(_progress);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VideoEditor = function (_Component) {
	(0, _inherits3.default)(VideoEditor, _Component);

	function VideoEditor(props) {
		(0, _classCallCheck3.default)(this, VideoEditor);

		var _this = (0, _possibleConstructorReturn3.default)(this, (VideoEditor.__proto__ || Object.getPrototypeOf(VideoEditor)).call(this, props));

		_this.state = {
			position: 0
		};

		_this.onRangeChange = _this.onRangeChange.bind(_this);
		_this.onPositionChange = _this.onPositionChange.bind(_this);

		_this.onVideoError = _this.onVideoError.bind(_this);
		_this.onVideoReady = _this.onVideoReady.bind(_this);
		_this.onVideoProgress = _this.onVideoProgress.bind(_this);
		_this.onVideoTimeupdate = _this.onVideoTimeupdate.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(VideoEditor, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._mounted = true;
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
		key: 'onVideoError',
		value: function onVideoError(e) {
			if (this._mounted && this.props.onError) {
				this.props.onError(e);
			}
		}
	}, {
		key: 'onVideoReady',
		value: function onVideoReady(filesData, mediaSource) {
			var duration = mediaSource.duration;


			this.safeState({
				duration: duration,
				filesData: filesData,
				ready: true
			});

			this.onReady(filesData, mediaSource);

			if (this.props.debug) {
				console.log('* requested files:', this.props.files.length);
				console.log('* displaying files:', filesData.length);
				console.log('* total time:', duration);
			}
		}
	}, {
		key: 'onVideoProgress',
		value: function onVideoProgress(progress) {
			this.safeState({ progress: progress });
		}
	}, {
		key: 'onVideoTimeupdate',
		value: function onVideoTimeupdate(position) {
			this.safeState({
				position: position,
				playing: position,
				interactive: true
			});
		}
	}, {
		key: 'onPositionChange',
		value: function onPositionChange(position) {
			this.safeState({
				position: position,
				currentTime: position,
				interactive: true
			});
		}
	}, {
		key: 'onRangeChange',
		value: function onRangeChange(values, position) {
			this.safeState({
				values: values,
				currentTime: position,
				interactive: false
			});

			this.onChange(values, position);
		}
	}, {
		key: 'getValues',
		value: function getValues() {
			var values = this.props.values;


			return values && values.length ? values : [[0, this.state.duration]];
		}
	}, {
		key: 'onChange',
		value: function onChange() {
			if (this.props.onChange) {
				var _props;

				(_props = this.props).onChange.apply(_props, arguments);
			}
		}
	}, {
		key: 'onReady',
		value: function onReady() {
			if (this.props.onReady) {
				var _props2;

				(_props2 = this.props).onReady.apply(_props2, arguments);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    ready = _state.ready,
			    progress = _state.progress,
			    duration = _state.duration,
			    filesData = _state.filesData,
			    playing = _state.playing,
			    interactive = _state.interactive,
			    position = _state.position,
			    currentTime = _state.currentTime;
			var _props3 = this.props,
			    _props3$files = _props3.files,
			    files = _props3$files === undefined ? [] : _props3$files,
			    _props3$sliceOptions = _props3.sliceOptions,
			    sliceOptions = _props3$sliceOptions === undefined ? {} : _props3$sliceOptions,
			    _props3$videoCodecs = _props3.videoCodecs,
			    videoCodecs = _props3$videoCodecs === undefined ? _defaults2.default.videoCodecs : _props3$videoCodecs,
			    _props3$formatTimeLab = _props3.formatTimeLabel,
			    formatTimeLabel = _props3$formatTimeLab === undefined ? _defaults2.default.formatTimeLabel : _props3$formatTimeLab;


			var values = this.getValues();

			return _react2.default.createElement(
				'div',
				{ className: 'montage-editor' },
				_react2.default.createElement(_video2.default, {
					files: files,
					values: values,
					interactive: interactive,
					currentTime: currentTime,
					videoCodecs: videoCodecs,
					onVideoError: this.onVideoError,
					onVideoReady: this.onVideoReady,
					onVideoProgress: this.onVideoProgress,
					onVideoTimeupdate: this.onVideoTimeupdate }),
				ready ? _react2.default.createElement(
					_scroll2.default,
					{
						position: playing,
						duration: duration },
					_react2.default.createElement(_control2.default, {
						values: values,
						position: position,
						duration: duration,
						filesData: filesData,
						interactive: interactive,
						formatTimeLabel: formatTimeLabel,
						onRangeChange: this.onRangeChange,
						onPositionChange: this.onPositionChange,
						sliceOptions: (0, _extends3.default)({}, _defaults2.default.sliceOptions, sliceOptions) })
				) : _react2.default.createElement(
					'div',
					{ className: 'montage-controls loading' },
					_react2.default.createElement(_progress2.default, { progress: progress })
				)
			);
		}
	}]);
	return VideoEditor;
}(_react.Component);

exports.default = VideoEditor;