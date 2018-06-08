import React, {Component} from 'react';
import Tooltip from 'rc-tooltip';
import {Handle} from 'rc-slider';


const createStyle = (style, index) => {
	const handleStyle = Array.isArray (style)
		? style [index] || style [0]
		: style || {};

	return handleStyle;
}

export default class TooltipHandle extends Component {

	constructor (props) {
		super(props);

		this.state = {
			visibles: {}
		};

		this.visibleChange = this.visibleChange.bind (this);
		this.onMouseEnter = this.onMouseEnter.bind (this);
		this.onMouseLeave = this.onMouseLeave.bind (this);
	}

	visibleChange (visible) {
		const {index} = this.props;

		this.setState ((prevState) => ({
			visibles: {
				...prevState.visibles,
				[index]: visible
			}
		}));
	}

	onMouseEnter () {
		this.visibleChange (true);
	}

	onMouseLeave () {
		this.visibleChange (false);
	}

	visible (dragging) {
		const {disabled, index} = this.props;
		const visible = this.state.visibles [index] || false;

		return !disabled
			? visible || dragging
			: false;
	}

	render () {
		const {
			value,
			index,
			style,
			dragging,
			tipFormatter,
			...handleProps
		} = this.props;

		return (
			<Tooltip
				placement="top"
				overlay={tipFormatter (value)}
				prefixCls="rc-slider-tooltip"
				visible={this.visible (dragging)}>

				<Handle
					{...handleProps}
					value={value}
					style={createStyle (style, index)}
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}>

					{index % 2 ? (
						<i className="fa fa-chevron-right"/>
					) : (
						<i className="fa fa-chevron-left"/>
					)}
				</Handle>
			</Tooltip>
		);
	}
}