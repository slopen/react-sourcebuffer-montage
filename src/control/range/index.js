import React from 'react';
import {Range} from 'rc-slider';

import {pack, unpack, valuesChange} from '../helpers';
import Handle from './handle';


const validateChange = (values, previous, onChange) => {
	const packed = pack (values);
	const changed = valuesChange (packed, previous);

	if (changed !== null) {
		onChange (packed, changed);
	}
};

const handle = (total, formatTimeLabel) =>
	(props) =>
		<Handle
			{...props}
			total={total}
			key={props.index}
			tipFormatter={(ts) => formatTimeLabel (ts * 1000)}/>


export default ({
	values,
	duration,
	onChange,
	formatTimeLabel
}) => {
	const value = unpack (values);
	const count = value.length;

	return typeof duration !== 'undefined' ? (
		<div className="range-control">
			<Range
				min={0}
				max={Math.floor (duration)}
				step={0.5}
				pushable={0.5}
				included={true}
				terminals={true}
				allowAcross={false}
				count={count}
				value={value}
				tipFormatter={formatTimeLabel}
				handle={handle (count, formatTimeLabel)}
				onChange={(updated) =>
					validateChange (updated, values, onChange)
				}/>
		</div>
	) : null;
}

