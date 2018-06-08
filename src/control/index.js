import React from 'react';

import TimelineControl from './timeline';
import RangeControl from './range';
import SliceControl from './slice';
import PlayBackControl from './playback';


export default ({
	values,
	position,
	duration,
	filesData,
	interactive,
	onPositionChange,
	onRangeChange,
	sliceOptions,
	formatTimeLabel
}) =>
	<div className="montage-controls">

		<TimelineControl
			data={filesData}
			duration={duration}/>

		<SliceControl
			values={values}
			duration={duration}
			onChange={onRangeChange}
			options={sliceOptions}
			formatTimeLabel={formatTimeLabel}/>

		<RangeControl
			values={values}
			duration={duration}
			onChange={onRangeChange}
			formatTimeLabel={formatTimeLabel}/>

		<PlayBackControl
			values={values}
			active={interactive}
			position={position}
			duration={duration}
			onChange={onPositionChange}
			formatTimeLabel={formatTimeLabel}/>
	</div>
