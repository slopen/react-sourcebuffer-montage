import React, {Component} from 'react';
import getFile from 'util/file';

const backgroundStyle = (url, style) => url ? ({
	...(url ? {backgroundImage: `url(${url})`} : {}),
	...style
}) : null;


export default class SecureBackground extends Component {
	constructor (props) {
		super (props);

		this.state = {};
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
		URL.revokeObjectURL (
			this.state.data
		);
	}

	safeState (state) {
		if (this.mounted) {
			this.setState (state);
		}
	}

	render () {
		// eslint-disable-next-line no-unused-vars
		const {src, style, ...props} = this.props;
		const {data} = this.state;

		return <div style={backgroundStyle (data, style)} {...props}/>;
	}

}