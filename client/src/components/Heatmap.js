import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';


export const Heatmap = ({ width, height }) => {
  const svgRef = useRef(null);

  // Sample data provided

  const selectorData = useSelector(state => state.outputs.df_cor_matrix);
  
  const [heatmapData, setHeatmapData] = useState([]);

  // Transform the sample data into a format suitable for the heatmap
  

  useEffect(() => {

    console.log('selector data:', selectorData);
    

    if (selectorData) {
      const formattedData = Object.entries(selectorData).flatMap(([x, values], i) => 
        values.map((value, j) => ({
          x,
          y: Object.keys(selectorData)[j], // Assuming the same order for y-axis labels
          value
    })));

    console.log('Formatted matrix data:', formattedData);  // Log the formatted data to the console
      setHeatmapData(formattedData);


  }

    
    
  }, [selectorData]); // The dependency array is set to height and width to re-render the heatmap when these props change


  

  const svg = d3.select(svgRef.current);
  svg.selectAll("*").remove(); // Clear SVG content before rendering new heatmap

  // Setup margins and graph width/height
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  // Create scales
  const xScale = d3.scaleBand()
    .domain(Object.keys(selectorData))
    .range([0, graphWidth])
    .padding(0.01);
  
  const yScale = d3.scaleBand()
    .domain(Object.keys(selectorData))
    .range([0, graphHeight])
    .padding(0.01);

  const colorScale = d3.scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([0, d3.max(heatmapData, d => d.value)]);

  // Create and append rectangles for the heatmap
  svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)
    .selectAll()
    .data(heatmapData)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.x))
    .attr('y', d => yScale(d.y))
    .attr('width', xScale.bandwidth())
    .attr('height', yScale.bandwidth())
    .style('fill', d => colorScale(d.value));

  // Add the X Axis
  svg.append("g")
    .attr("transform", `translate(${margin.left},${graphHeight + margin.top})`)
    .call(d3.axisBottom(xScale));

  // Add the Y Axis
  svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .call(d3.axisLeft(yScale));


  return (
    <div>
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );



};
