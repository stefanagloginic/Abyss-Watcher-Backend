import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import * as d3 from 'd3'
import { select } from 'd3-selection'
//--------------CSS----------------------
import '../Stylesheets/Legend.css';
//--------------Components----------------------
import ColorLegend from './ColorLegend'

class Legend extends Component {
	constructor(props){
		super(props)
	}

	getProps = () => {
		const { plottedND } = this.props;
		this.plottedND = plottedND;
	}

	componentDidMount = () => {
		this.createLegend();
	}

	createLegend = () => {
		const node = this.node;
		var width = window.innerWidth;
		var height = window.innerHeight;
		this.getProps();

		select(node)
			.append("g")
			.attr("class", "legend_group");

		var legends = select(node)
			.select("g");
		
		legends
			.data(this.plottedND)
			.enter()
			.append("g")
			.attr("class", "legend");

		legends.append('rect')
		    .attr('width', 10)
		    .attr('height', 10);
		    // .style('fill', function(d) {
		    // 	return color(d.name);
		    // })
		legends.append('svg:text')
		    .text(function(d) {
		        return d.type;
		    })
		    .attr("class", "legend_text");
;
	}

	render() {
		// var colorLegends = (this.plottedND) ? this.plottedND.map(function(nd) {
		// 	return <ColorLegend name={ nd.type } />
		// }) : [];

		return (
			<svg 
				className="legend_wrapper" 
				ref={node => this.node = node} 
				width={ '15%'} 
				height={ '15%' } 
				/>
		);
	}
}

export default Legend;
