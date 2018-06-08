import React from 'react';

import Background from 'util/background';

const clipStyle = ({
	start,
	end
}, duration) => duration ? ({
	width: `${100 * ((end - start) / duration)}%`
}) : null;

const Clip = ({data, duration}) =>
	<Background
		className="clip"
		src={data.thumbnail}
		style={clipStyle (data, duration)}/>


export default ({data, duration}) => {
	if (!data) {
		return null;
	}

	return (
		<div className="timeline">
			{data.map ((item, index) =>
				<Clip
					key={index}
					data={item}
					duration={duration}/>
			)}
		</div>
	);
}