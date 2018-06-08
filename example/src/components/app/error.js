import React from 'react';

const parseError = ({message}) => {
	if (message.match (/connection\serror|502/)) {
		return 'connection error';
	}

	console.error ('application error', message);

	return 'application error';
}

export default ({error, retry}) =>
	<div className="app-init-error text-capitalize">
		<p><i className="fa fa-exclamation-triangle"/></p>
		{parseError (error)}
		<p><a href="#" onClick={(e) => {
			retry (true);
			e.preventDefault ();
		}}>retry?</a></p>
	</div>