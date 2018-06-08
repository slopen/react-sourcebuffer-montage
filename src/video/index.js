import React, {Component} from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';

import PlayBtn from './play';

import {
	getFilesData,
	prepareSourceBuffer
} from './source';

import {
	rangePrecision,
	alignPlayStart,
	alignPlayProgress
} from '../control/helpers';


export default class VideoPreview extends Component {

	constructor (props) {
		super (props);

		this.state = {
			paused: true
		};

		this.prepareBuffer = throttle (this.prepareBuffer, 249).bind (this);
		this.updatePaused = debounce (this.updatePaused, 636).bind (this);

		this.onVideoPause = this.onVideoPause.bind (this);
		this.onVideoPlay = this.onVideoPlay.bind (this);
		this.onVideoTimeupdate = this.onVideoTimeupdate.bind (this);
		this.onVideoToggle = this.onVideoToggle.bind (this);
	}

	componentDidMount () {
		this._mounted = true;
		this.init ();
	}

	componentWillUnmount () {
		this._mounted = false;
	}

	safeState (state, cb) {
		if (this._mounted) {
			this.setState (state, cb);
		}
	}

	componentWillReceiveProps ({currentTime, interactive}) {
		const {interactive: previousInt} = this.props;
		const {currentTime: previousTime} = this.props;

		if (interactive !== previousInt) {
			this.onInteractiveChange (interactive);
		}
		if (previousTime !== currentTime) {
			this.onPositionChange (currentTime);
		}
	}

	async init () {
		try {
			await this.initVideo ();
			await this.initSource ();
		} catch (e) {
			this.props.onVideoError (e);
		}
	}

	async initVideo () {
		return new Promise ((resolve, reject) => {
			try {
				const {video} = this.refs;

				this.mediaSource = new MediaSource ();
				this.mediaSource.onerror = reject;
				this.mediaSource.onsourceopen = resolve;
				this.videoURL = URL.createObjectURL (this.mediaSource);

				video.onerror = reject;
				video.onclick = this.onVideoToggle;
				video.onplay = this.onVideoPlay;
				video.onpause = this.onVideoPause;
				video.onseeking = this.onVideoTimeupdate;
				video.ontimeupdate = this.onVideoTimeupdate;
				video.src = this.videoURL;

			} catch (e) {
				reject (e);
			}
		});
	}

	async initSource () {
		const {video} = this.refs;
		const {mediaSource} = this;

		const {
			files,
			videoCodecs,
			onVideoProgress
		} = this.props;

		URL.revokeObjectURL (this.videoURL);

		const filesData = await getFilesData ({
			files,
			mediaSource,
			videoCodecs,
			onVideoProgress
		});

		this.safeState ({filesData});
		this.props.onVideoReady (filesData, video);
	}

	prepareBuffer (position) {
		const {mediaSource} = this;
		const {filesData} = this.state;

		const update = () =>
			prepareSourceBuffer ({
				mediaSource,
				position,
				filesData
			});

		return (
			this._buffering
				? this._buffering.then (update)
				: this._buffering = update ()
		)
			.then (() =>
				delete this._buffering
			);
	}

	async onVideoToggle () {
		const {video} = this.refs;
		const {values} = this.props;
		const {paused} = video;

		if (paused) {
			const {interactive} = this.props;
			const {currentTime: position} = video;
			const aligned = alignPlayStart (position, values, interactive);

			this.safeState ({interactive: true});
			await this.prepareBuffer (aligned);

			if (position !== aligned) {
				video.onseeked = () => {
					video.onseeked = null;
					video.play ();
				};

				video.currentTime = aligned;
			} else {
				video.play ();
			}
		} else {
			video.pause ();
		}
	}

	onVideoPause () {
		this.updatePaused (true);
	}

	onVideoPlay () {
		this.updatePaused (false);
	}

	async onVideoTimeupdate ({target: video}) {
		const {values} = this.props;
		const {currentTime: position} = video;

		if (!video.paused) {
			const [, end] = values [values.length - 1];

			if (position > end - rangePrecision) {
				return video.pause ();
			}

			const aligned = alignPlayProgress (position, values);

			await this.prepareBuffer (aligned);

			if (aligned !== position) {
				video.currentTime = aligned;
			}

			this.props.onVideoTimeupdate (
				video.currentTime
			);
		}
	}

	async onPositionChange (position) {
		const {video} = this.refs;

		if (!video || typeof position !== 'number') {
			return;
		}

		if (video.currentTime !== position) {
			await this.prepareBuffer (position);
			video.currentTime = position;
		}
	}

	onInteractiveChange (interactive) {
		const {video} = this.refs;

		if (
			!interactive &&
			video && !video.paused
		) {
			video.pause ();
		}
	}

	updatePaused (paused) {
		this.safeState ({paused});
	}

	render () {
		const {files} = this.props;
		const {paused} = this.state;

		return files ? (
			<div className="video-container">
				<video id="video" ref="video"/>
				<PlayBtn paused={paused}/>
			</div>
		) : (
			<div className="video-container loading">
				<div className="loader-bar-gray"/>
			</div>
		);
	}
}