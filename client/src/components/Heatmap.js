import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import { CorrLegend } from './CorrLegend';


export const Heatmap = ({ width, height }) => {
  const svgRef = useRef(null);

  // Sample data provided

  const selectorData = useSelector(state => state.outputs.df_cor_matrix);
  
  const [heatmapData, setHeatmapData] = useState([]);

  // Transform the sample data into a format suitable for the heatmap
  

  useEffect(() => {
    console.log('selector data:', selectorData);
  
    if (selectorData) {
      const formattedData = Object.entries(selectorData).flatMap(([x, values]) =>
        Object.entries(values).map(([y, value]) => ({
          x,   // The 'x' label
          y,   // The 'y' label, corresponding to each key within the nested objects
          value // The correlation value between 'x' and 'y'
        }))
      );
  
      console.log('Formatted matrix data:', formattedData); // Log the formatted data to the console
      setHeatmapData(formattedData);
    }
  
  }, [selectorData]); // The dependency array should include only selectorData since that's the only external variable this effect depends on
  

  const colorScale = d3.scaleSequential()
  .interpolator(d3.interpolateRgb.gamma(2.2)("blue", "red"))
  .domain([0, d3.max(heatmapData, d => d.value)]);
  

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
    .padding(0.07);
  
  const yScale = d3.scaleBand()
    .domain(Object.keys(selectorData))
    .range([0, graphHeight])
    .padding(0.07);

  

  // Create and append rectangles for the heatmap with rounded corners
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
    .attr('rx', 10) // Rounded corners
    .attr('ry', 10) // Rounded corners
    .style('fill', d => colorScale(d.value));
    
      // Add the X Axis and remove the axis line and tick marks, keeping the labels
  svg.append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(${margin.left},${graphHeight + margin.top})`)
  .call(d3.axisBottom(xScale))
  .select(".domain").remove(); // Remove the axis line

  d3.selectAll(".x-axis .tick line").remove(); // Remove the tick marks

// Add the Y Axis and remove the axis line and tick marks, keeping the labels
  svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .call(d3.axisLeft(yScale))
    .select(".domain").remove(); // Remove the axis line

  d3.selectAll(".y-axis .tick line").remove(); // Remove the tick marks

  return (
    <div>
      <div>
        <svg ref={svgRef} width={width} height={height} />
      </div>
      <div >
        <CorrLegend heatmapData={heatmapData} colorScale={colorScale}/>
      </div>
    </div>
  );



};
