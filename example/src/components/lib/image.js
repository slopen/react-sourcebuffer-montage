import React, {Component} from 'react';
import getFile from 'components/lib/file';

export default class SecureImage extends Component {
	constructor (props) {
		super (props);

		this.state = {};
		this.onLoad = this.onLoad.bind (this);
	}

	componentDidMount () {
		this.mounted = true;

		getFile (this.props.src, 'blob')
			.then ((data) =>
				this.safeState ({
					data: URL.createObjectURL (data)
				})
			)
			.catch ((error) =>
				this.safeState ({error})
			);
	}

	componentWillUnmount () {
		this.mounted = false;
	}

	safeState (state) {
		if (this.mounted) {
			this.setState (state);
		}
	}

	onLoad () {
		URL.revokeObjectURL (
			this.state.data
		);
	}

	render () {
		const {src, ...props} = this.props;
		const {data, error} = this.state;

		if (src && data) {
			return <img src={data} {...props} onLoad={this.onLoad}/>;
		} else if (error) {
			return <span data-error={error.message}/>;
		}

		return null;
	}

}