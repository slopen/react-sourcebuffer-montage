import React, {Component} from 'react';

const seconds2Px = 5;
const scrollDuration = 249;

const easing = (t) =>
	t < 0.5 ? 4*t*t*t : ((t - 1) * ((2*t) - 2) * ((2*t) - 2)) + 1;

const scrollElement = (element, scroll) => {
	let start = null;

	const scrollLeft = element.scrollLeft;
	const diff = scroll - scrollLeft;

	requestAnimationFrame (function step (timestamp) {
		if (!start) {
			start = timestamp;
		}

		const time = timestamp - start;
		const percent = easing (
			Math.min (time / scrollDuration, 1)
		);

		element.scrollLeft = scrollLeft + (diff * percent);

		if (time < scrollDuration) {
			requestAnimationFrame (step);
		}
	})
};

const scrollPosition = (element, position) => {
	const {clientWidth: width} = element;
	const offset = (seconds2Px * position) - (width / 2);

	scrollElement (element, offset < 0 ? 0 : offset);
};

const wrapStyle = (duration) => ({
	width: `${duration * seconds2Px}px`
});

export default class ScrollLeft extends Component {

	componentWillReceiveProps ({position}) {
		const {scrollable} = this.refs;

		if (scrollable && this.props.position !== position) {
			scrollPosition (scrollable, position);
		}
	}

	render () {
		return (
			<div
				ref="scrollable"
				className="control-container">

				<div
					className="wrap"
					style={wrapStyle (
						this.props.duration
					)}>

					{this.props.children}
				</div>
			</div>
		);
	}

}
