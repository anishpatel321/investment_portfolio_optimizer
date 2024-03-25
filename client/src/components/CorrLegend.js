import React, { useRef } from 'react';
import * as d3 from "d3";

export const CorrLegend = ({ heatmapData, colorScale }) => {
 //add the legend
 const svgRef = useRef(null);
 const svg = d3.select(svgRef.current);
 svg.selectAll("*").remove();

const legendWidth = 300;
const legendHeight = 20;
//const legendPosition = { x: 20, y: graphHeight + margin.top + margin.bottom + 40 };

// Append SVG group for the legend
const legend = svg.append("g");
//const legend = svg.append("g").attr("transform", `translate(${legendPosition.x},${legendPosition.y})`);


// Define a linear gradient for the color scale
const gradient = legend.append("defs")
  .append("linearGradient")
  .attr("id", "gradient")
  .attr("x1", "0%")
  .attr("x2", "100%")
  .attr("y1", "0%")
  .attr("y2", "0%");

// Use colorScale to create gradient stops
const nStops = 10; // Number of stops for the gradient
const colorRange = d3.range(0, 1, 1 / nStops).map(t => colorScale(t * d3.max(heatmapData, d => d.value)));

colorRange.forEach((color, index) => {
  gradient.append("stop")
    .attr("offset", `${index / (colorRange.length - 1) * 100}%`)
    .attr("stop-color", color);
});

// Draw the legend rectangle filled with the gradient
legend.append("rect")
  .attr("width", legendWidth)
  .attr("height", legendHeight)
  .style("fill", "url(#gradient)");

// Add legend axis (assuming a linear value range for simplicity)
const domain = colorScale.domain();
const legendScale = d3.scaleLinear()
.range([0, legendWidth])
  .domain([0, domain[domain.length-1]]);

const legendAxis = d3.axisBottom(legendScale).ticks(1); // Adjust tick count as needed

legend.append("g")
  .attr("class", "legend-axis")
  .attr("transform", `translate(0, ${legendHeight})`)
  .call(legendAxis);

  return (
    <div >
        <div style={{display: "flex"}}>
            <div
                style={{border:"2px solid black", height: "30px"}}
            />
            <svg ref={svgRef} width={legendWidth} height={legendHeight} /> 
            <div
                style={{border:"2px solid black", height: "30px"}}
            />
        </div>
        <div style={{width: 310}}>
            <text
                x={10}
                y={legendHeight + 20}
                fontSize={5}
            >
            Low Correlation
            </text>
            <div style={{float: "right"}}>
                <text
                    x={10}
                    y={legendHeight + 20}
                    fontSize={5}
                >
                High Correlation
                </text>
            </div>
        </div>
    </div>
  );

};