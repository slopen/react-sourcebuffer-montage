'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {

	videoCodecs: 'video/webm; codecs="vorbis,vp8"',

	sliceOptions: {
		maxRangeCount: 50,
		insertRangeWidth: 2,
		insertRangeMargin: 2
	},

	formatTimeLabel: function formatTimeLabel() {
		var ss = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

		return new Date(ss).toISOString().substr(14, 9);
	}
};