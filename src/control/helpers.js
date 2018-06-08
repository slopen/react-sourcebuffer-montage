import flatten from 'lodash.flatten';

export const rangePrecision = 0.25;

export const pack = (values) =>
	values.reduce ((result, value, index) => {
		if (!(index % 2)) {
			result.push ([
				value,
				values [index + 1]
			]);
		}

		return result;
	}, []);

export const unpack = flatten;

export const normalize = (num) =>
	Number ((num || 0).toFixed (6));

export const inRange = (value, [start, end]) =>
	(normalize (value) >= normalize (start)) &&
	(normalize (value) <= normalize (end));


export const alignPlayStart = (position, values, replay) => {
	const start = values [0];

	if (position <= start [0]) {
		return start [0];
	}

	const end = values [values.length - 1];

	if (position >= end [1] - rangePrecision) {
		return replay ? start [0] : end [0];
	}

	const range = values.find ((range) =>
		position <= range [1] &&
		position >= range [1] - rangePrecision
	);

	return range ? range [0] : position;
}

export const alignPlayProgress = (position, values) => {
	const index = values.findIndex ((range) =>
		position <= range [1] &&
		position >= range [1] - rangePrecision
	);

	const range = index !== -1 &&
		values [index + 1];

	return range ? range [0] : position;
}

export const valuesChange = (values, previous) => {
	let position = null;

	for (let i = 0; i < values.length; i++) {
		const range = values [i];
		const prev = previous [i];

		if (prev [0] !== range [0]) {
			return range [0];
		}
		if (prev [1] !== range [1]) {
			return range [1];
		}
	}

	return position;
}

export const canInsert = (values, value, {
	duration,
	maxRangeCount,
	insertRangeWidth,
	insertRangeMargin
}) => {
	const bounds = unpack (values)
		.reduce ((bounds, next) => {
			if (value > next) {
				bounds [0] = next;
			}
			if (value < next && next < bounds [1]) {
				bounds [1] = next;
			}

			return bounds;
		}, [0, duration]);

	return values.length < maxRangeCount &&
		bounds [1] - bounds [0] > insertRangeWidth &&
		bounds [1] - value > insertRangeMargin &&
		bounds [0] - value < -insertRangeMargin;
}


export const insert = (value, values, rangeOptions) => {
	if (canInsert (values, value, rangeOptions)) {
		const {insertRangeWidth} = rangeOptions;
		const unpacked = unpack (values);

		unpacked.push (
			value - (insertRangeWidth / 2),
			value + (insertRangeWidth / 2)
		);

		return pack (
			unpacked.sort ((a, b) => a - b)
		);
	}

	return values;
}
