import React from 'react';
import Slider from 'rc-slider';

import {inRange} from '../helpers';

const PlayBackItem = ({
	end,
	start,
	active,
	duration = 0,
	position = start,
	onChange
}) => {
	const display = active && inRange (position, [start, end]);

	return (
		<div className={`playback-control${
			display ? '' : ' disabled'
		}`} style={{
			left: `${100 * (start / duration)}%`,
			right: `${100 - (100 * end / duration)}%`
		}}>
			<Slider
				max={end}
				min={start}
				step={0.5}
				onChange={onChange}
				defaultValue={start}
				value={display ? position : start}/>
		</div>
	);
}

export default ({
	active,
	values,
	duration,
	position,
	onChange
}) => values
	? values.map (([start, end], key) =>
		<PlayBackItem
			key={key}
			start={start}
			end={end}
			active={active}
			duration={duration}
			position={position}
			onChange={onChange}/>
	) : null;

