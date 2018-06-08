import React, {Component} from 'react';

import config from 'config';
import api from 'components/api';

import MontageEditor from '../../../../../lib';

const {
	videoCodecs,
	maxRangeCount,
	insertRangeWidth,
	insertRangeMargin
} = config;


export default class VideoPreview extends Component {

	constructor (props) {
		super (props);

		this.state = {};

		this.onReset = this.onReset.bind (this);
		this.onConfirm = this.onConfirm.bind (this);

		this.onEditorReady = this.onEditorReady.bind (this);
		this.onEditorError = this.onEditorError.bind (this);
		this.onEditorChange = this.onEditorChange.bind (this);
	}

	async componentDidMount () {
		try {
			const {
				files,
				ranges: values
			} = await api.videos.getMontage ();

			this.setState ({files, values});
		} catch (e) {
			console.error ('error', e);
		}
	}

	onEditorReady (data, {duration}) {
		this.setState ({duration});
	}

	onEditorError (e) {
		console.error ('editor error', e);
	}

	onEditorChange (values) {
		this.setState ({values});
	}

	onReset (e) {
		this.setState ({values: null});
		e.preventDefault ();
	}

	onConfirm (e) {
		console.log ('EDITOR VALUES:', this.state.values);
		e.preventDefault ();
	}

	render () {
		const {files, values} = this.state;

		return (
			<div className="content montage">

				{files ? (
					<MontageEditor
						debug={true}
						files={files}
						values={values}
						onReady={this.onEditorReady}
						onError={this.onEditorError}
						onChange={this.onEditorChange}
						videoCodecs={videoCodecs}
						sliceOptions={{
							maxRangeCount,
							insertRangeWidth,
							insertRangeMargin
						}}/>
				) : null}

				<div className="actions">
					<a
						href="#"
						onClick={this.onReset}
						className="btn btn-reset">
						reset
					</a>
					<a
						href="#"
						onClick={this.onConfirm}
						className="btn btn-confirm">
						read
					</a>
				</div>
			</div>
		);
	}
}