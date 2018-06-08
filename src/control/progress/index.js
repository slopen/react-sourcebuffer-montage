import React from 'react';


export default ({progress}) =>
	<div className="loader-bar-gray loader-bar-progress">
		<div
			className="handle"
			style={{width: `${progress}%`}}/>
	</div>
