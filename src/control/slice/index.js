import React, {Component} from 'react';
import {insert, canInsert} from '../helpers';


const handleStyle = (position) => {
	const result = position < 0 ? 0 : position;

	return {
		left: `${100 * (result > 1 ? 1 : result)}%`
	}
};

const relativePosition = ({clientX, clientY}, el) => {
	const {left, top, width, height} = el.getBoundingClientRect ();

	return {
		top: (clientY - top) / height,
		left: (clientX - left) / width
	};
}



export default class SliceControl extends Component {

	constructor (props) {
		super (props);

		this.state = {
			position: 0
		};

		this.onMouseOver = this.onMouseOver.bind (this);
		this.onMouseMove = this.onMouseMove.bind (this);
		this.onMouseOut = this.onMouseOut.bind (this);
		this.onActionClick = this.onActionClick.bind (this);
	}

	onMouseOver () {
		this.setState ({active: true});
	}

	onMouseMove ({clientX, clientY}) {
		requestAnimationFrame (() => {
			if (this.state.active) {
				const {left, top} = relativePosition (
					{clientX, clientY}, this.refs.control);

				if (top > 0.5) {
					this.updatePosition (left);
				}
			}
		});
	}

	onMouseOut () {
		this.setState ({active: false});
	}

	onActionClick (e) {
		const {position} = this.state;
		const {values, duration, options} = this.props;

		const value = duration * position;
		const updated = insert (value, values, {
			...options,
			duration
		});

		this.props.onChange (updated);

		e.preventDefault ();
	}

	updatePosition (position) {
		const {values, duration, options} = this.props;
		const value = duration * position;

		this.setState ({
			position,
			disabled: !canInsert (values, value, {
				...options,
				duration
			})
		});
	}

	render () {
		const {
			active,
			position,
			disabled
		} = this.state;

		const {
			duration,
			formatTimeLabel
		} = this.props;

		return (
			<div
				ref="control"
				className={`slice-control${
					(active ? ' active' : '') +
					(disabled ? ' disabled' : '')
				}`}>

				<div className="listener"
					onMouseOver={this.onMouseOver}
					onMouseMove={this.onMouseMove}
					onMouseOut={this.onMouseOut}
					onClick={this.onActionClick}/>

				<div
					style={handleStyle (position)}
					className="slice-handle">

					<div className="slice-tooltip">
						{formatTimeLabel (duration * position * 1000)}
					</div>

					<a href="#" className="action">
						<i className="fa fa-scissors"/>
					</a>
				</div>
			</div>
		);
	}
}

