import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import { Grid, Typography } from '@mui/material';

export const Heatmap = ({ width, height }) => {
  const svgRef = useRef(null);

  const selectorData = useSelector(state => state.outputs.df_cor_matrix);
  
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    if (selectorData) {
      const formattedData = Object.entries(selectorData).flatMap(([x, values]) =>
        Object.entries(values).map(([y, value]) => ({
          x,
          y,
          value
        }))
      );
      setHeatmapData(formattedData);
    }
  }, [selectorData]);

  const colorScale = d3.scaleSequential()
    .interpolator(d3.interpolateRgb.gamma(2.2)("blue", "red"))
    .domain([0, d3.max(heatmapData, d => d.value)]);

  const svg = d3.select(svgRef.current);

  svg.selectAll("*").remove();

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleBand()
    .domain(Object.keys(selectorData))
    .range([0, graphWidth])
    .padding(0.07);
  
  const yScale = d3.scaleBand()
    .domain(Object.keys(selectorData))
    .range([0, graphHeight])
    .padding(0.07);

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
    .attr('rx', 10)
    .attr('ry', 10)
    .style('fill', d => colorScale(d.value));

  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(${margin.left},${graphHeight + margin.top})`)
    .call(d3.axisBottom(xScale))
    .select(".domain").remove();

  d3.selectAll(".x-axis .tick line").remove();

  svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .call(d3.axisLeft(yScale))
    .select(".domain").remove();

  d3.selectAll(".y-axis .tick line").remove();

  return (
    <Grid sx={{color: 'white', position: 'relative'}}>
      <svg ref={svgRef} width={width} height={height} />
      <svg width={'3vw'} height={height}>
        <defs>
          <linearGradient id="legendGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{stopColor: "blue", stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: "red", stopOpacity: 1}} />
          </linearGradient>
        </defs>
        <rect fill="url(#legendGradient)" width={'3vw'} height={height*0.8} y={height*0.1} />
        <text x="50%" y="15%" textAnchor="middle" fill="white" fontWeight={'bold'}>High</text>
        <text x="50%" y="86%" textAnchor="middle" fill="white" fontWeight={'bold'}>Low</text>
      </svg>
      <Typography variant="h5" style={{ position: 'absolute', top: '2vh', left: width, marginLeft: '6vw', marginRight: '2vw', color: 'white'}}>filler text to explain this metric: The Correlation matrix to the left can be interprested using the heat map colors, blue being very low Correlation and red being very high.</Typography>
    </Grid>
  );
  
};
