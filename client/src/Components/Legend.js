import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import * as d3 from 'd3'
import { select } from 'd3-selection'
//--------------CSS----------------------
import '../Stylesheets/Legend.css';
//--------------Components----------------------
import ColorLegend from './ColorLegend'
//--------------Config----------------------
import colorsConfig from '../Configs/legendcolors'

class Legend extends Component {
	constructor(props){
		super(props)
	}

	getProps = () => {
		const { plottedND, disastersConfig } = this.props;
		this.plottedND = plottedND;
	}

	componentDidUpdate = () => {

	}

	render() {
		this.getProps();

		var legends = this.plottedND ? Object.values(this.plottedND).map((ndObj) => {
			var color = "";
			if( ndObj.visible ) {
				Object.values(colorsConfig).forEach((configObj) => {
					if(configObj.type == ndObj.type) {
						color = configObj.color;
					}
				})

				return <div className="legend" key={ ndObj.type }>
						<div className="color_div" style={{ "backgroundColor" : color }}></div>
						<p className="legend_text">{ ndObj.type }</p>
					</div>
			}
		}) : [];

		return (
			<div 
				className="legend_wrapper" 
				width={ '15%'} 
				height={ '15%' }
			>
				<div className="legend_group">
					{ legends }
				</div>
			</div>
		);
	}
}

export default Legend;
