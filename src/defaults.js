export default {

	videoCodecs: 'video/webm; codecs="vorbis,vp8"',

	sliceOptions: {
		maxRangeCount: 50,
		insertRangeWidth: 2,
		insertRangeMargin: 2
	},

	formatTimeLabel (ss = 0) {
		return new Date (ss)
			.toISOString ()
			.substr (14, 9);
	}
}