'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.prepareSourceBuffer = exports.addSourceBuffer = exports.removeSourceBuffer = exports.findBufferData = exports.getFilesData = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _file = require('../util/file');

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mode = 'segments';

var isOpen = function isOpen(_ref) {
	var readyState = _ref.readyState;
	return new Promise(function (resolve, reject) {
		return readyState === 'open' ? resolve(readyState) : reject(new Error('media source closed'));
	});
};

var appendAndRemoveBuffer = function () {
	var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
		var mediaSource = _ref3.mediaSource,
		    dataBuffer = _ref3.dataBuffer;

		var _mediaSource$sourceBu, sourceBuffer, buffer, start, end;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return isOpen(mediaSource);

					case 2:
						_mediaSource$sourceBu = (0, _slicedToArray3.default)(mediaSource.sourceBuffers, 1), sourceBuffer = _mediaSource$sourceBu[0];
						buffer = new Uint8Array(dataBuffer);
						start = mediaSource.duration || 0;
						_context.next = 7;
						return new Promise(function (resolve) {
							sourceBuffer.onupdateend = function () {
								return resolve(mediaSource.duration);
							};

							sourceBuffer.timestampOffset = start;
							sourceBuffer.appendBuffer(buffer);
						});

					case 7:
						end = _context.sent;
						_context.next = 10;
						return isOpen(mediaSource);

					case 10:
						_context.next = 12;
						return new Promise(function (resolve) {
							if (start !== 0) {
								sourceBuffer.onupdateend = resolve;
								sourceBuffer.remove(start, end);
							} else {
								resolve();
							}
						});

					case 12:

						sourceBuffer.onupdateend = null;

						return _context.abrupt('return', { start: start, end: end, buffer: buffer });

					case 14:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function appendAndRemoveBuffer(_x) {
		return _ref2.apply(this, arguments);
	};
}();

var getFilesData = exports.getFilesData = function () {
	var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref5) {
		var files = _ref5.files,
		    mediaSource = _ref5.mediaSource,
		    videoCodecs = _ref5.videoCodecs,
		    onVideoProgress = _ref5.onVideoProgress;
		var filesData, sourceBuffer, i, src, dataBuffer, data;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.next = 2;
						return isOpen(mediaSource);

					case 2:
						filesData = [];
						sourceBuffer = mediaSource.addSourceBuffer(videoCodecs);


						sourceBuffer.mode = mode;

						i = 0;

					case 6:
						if (!(i < files.length)) {
							_context2.next = 25;
							break;
						}

						src = files[i].src;
						_context2.prev = 8;
						_context2.next = 11;
						return (0, _file2.default)(src);

					case 11:
						dataBuffer = _context2.sent;
						_context2.next = 14;
						return appendAndRemoveBuffer({ mediaSource: mediaSource, dataBuffer: dataBuffer });

					case 14:
						data = _context2.sent;


						filesData.push((0, _extends3.default)({}, files[i], data));

						if (onVideoProgress) {
							onVideoProgress(100 * (i + 1) / files.length);
						}

						_context2.next = 22;
						break;

					case 19:
						_context2.prev = 19;
						_context2.t0 = _context2['catch'](8);
						return _context2.abrupt('return', Promise.reject(_context2.t0));

					case 22:
						i++;
						_context2.next = 6;
						break;

					case 25:
						return _context2.abrupt('return', filesData);

					case 26:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[8, 19]]);
	}));

	return function getFilesData(_x2) {
		return _ref4.apply(this, arguments);
	};
}();

var findBufferData = exports.findBufferData = function findBufferData(filesData, position) {
	var index = filesData.findIndex(function (_ref6) {
		var start = _ref6.start,
		    end = _ref6.end;
		return start <= position && position <= end;
	});

	if (index !== -1) {
		return [filesData[index], filesData[index - 1], filesData[index + 1]];
	}
};

var removeSourceBuffer = exports.removeSourceBuffer = function removeSourceBuffer(buffer, bufferData) {
	return bufferData && new Promise(function (resolve) {
		if (buffer.updating) {
			buffer.abort();
		}

		var listener = function listener() {
			buffer.removeEventListener('updateend', listener);
			resolve();
		};

		buffer.addEventListener('updateend', listener);
		buffer.remove(bufferData.start, bufferData.end);
	});
};

var addSourceBuffer = exports.addSourceBuffer = function addSourceBuffer(buffer, bufferData) {
	return bufferData && new Promise(function (resolve) {
		if (buffer.updating) {
			buffer.abort();
		}

		var listener = function listener() {
			buffer.removeEventListener('updateend', listener);
			resolve();
		};

		buffer.addEventListener('updateend', listener);
		buffer.timestampOffset = bufferData.start;
		buffer.appendBuffer(bufferData.buffer);
	});
};

var prepareSourceBuffer = exports.prepareSourceBuffer = function () {
	var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref8) {
		var mediaSource = _ref8.mediaSource,
		    filesData = _ref8.filesData,
		    position = _ref8.position;

		var buffersData, currentData, addition, removal, _mediaSource$sourceBu2, sourceBuffer, i, bufferData, _i, _bufferData;

		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						buffersData = findBufferData(filesData, position);
						currentData = mediaSource._current || [];
						addition = buffersData.filter(function (buf) {
							return currentData.indexOf(buf) === -1;
						});
						removal = currentData.filter(function (buf) {
							return buffersData.indexOf(buf) === -1;
						});
						_mediaSource$sourceBu2 = (0, _slicedToArray3.default)(mediaSource.sourceBuffers, 1), sourceBuffer = _mediaSource$sourceBu2[0];
						i = 0;

					case 6:
						if (!(i < addition.length)) {
							_context3.next = 13;
							break;
						}

						bufferData = addition[i];
						_context3.next = 10;
						return addSourceBuffer(sourceBuffer, bufferData);

					case 10:
						i++;
						_context3.next = 6;
						break;

					case 13:
						_i = 0;

					case 14:
						if (!(_i < removal.length)) {
							_context3.next = 21;
							break;
						}

						_bufferData = removal[_i];
						_context3.next = 18;
						return removeSourceBuffer(sourceBuffer, _bufferData);

					case 18:
						_i++;
						_context3.next = 14;
						break;

					case 21:

						mediaSource._current = buffersData;

					case 22:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined);
	}));

	return function prepareSourceBuffer(_x3) {
		return _ref7.apply(this, arguments);
	};
}();