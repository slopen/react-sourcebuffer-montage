import React from 'react';

import {
	Route,
	Switch,
	HashRouter as Router
} from 'react-router-dom';

import App from 'components/app';


export default () =>
	<Router>
		<Switch>
			<Route
				path="*"
				component={App}/>
		</Switch>
	</Router>
