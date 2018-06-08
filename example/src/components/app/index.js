import React, {Component} from 'react';

import api from 'components/api';
import AppContent from './content';
import AppError from './error';


const init = () =>
	api.videos.getMontage ();


export default class App extends Component {

	constructor (props) {
		super (props);

		this.state = {};

		this.init = this.init.bind (this);
	}

	componentDidMount () {
		this.init ();
	}

	async init () {
		try {
			this.setState ({
				data: await init ()
			});
		} catch (error) {
			this.setState ({error});
		}
	}

	render () {
		const {
			data,
			error
		} = this.state;

		if (error) {
			return <AppError
				error={error}
				retry={this.init}/>;
		}

		return data
			? <AppContent data={data}/>
			: <div className="loader-bar"/>;
	}
}