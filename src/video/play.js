import React from 'react';


export default ({paused}) =>
	<a href="#" className={
		`play-btn${paused ? ' paused': ''}`
	}>
		<i className="fa fa-play"/>
	</a>
