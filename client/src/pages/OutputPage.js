import React, { useState, useEffect, useRef } from 'react';
import TopBar from '../components/TopBar';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import * as d3 from 'd3';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
}));

const OutputPage = () => {
  const [pieChartData, setPieChartData] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    // Fetch pie chart data from the Flask server
    fetchPieChartData();
  }, []);

  useEffect(() => {
    if (pieChartData) {
      drawPieChart();
    }
  }, [pieChartData]);

  const fetchPieChartData = () => {
    // Make API call to fetch pie chart data
    fetch('http://localhost:5000/pie-chart-data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        console.log('Pie chart data:', data);
        setPieChartData(data);
      })
      .catch(error => console.error('Error fetching pie chart data:', error));
};

  const drawPieChart = () => {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal()
      .range(['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#FF5722']);

    const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const g = svg.selectAll('.arc')
      .data(pie(Object.entries(pieChartData)))
      .enter().append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', arc)
      .style('fill', d => color(d.data[0]));

    g.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '.35em')
      .text(d => d.data[0]);
  };

  // Placeholder for initial investment amount and projected investment amount
  const initialInvestmentAmount = 10000; // Placeholder value
  const projectedInvestmentAmount = 15000; // Placeholder value

  return (
    <>
      <TopBar />
      <Grid sx={{ width: '95%', mx: 'auto', color: 'white' }}>
        <Typography variant="h3" component="h1" gutterBottom align="left"
                    style={{ marginLeft: '7px', marginRight: '7px', marginTop: '30px', fontWeight: 'bold', fontSize: '350%' }}>
          Your Portfolio Overview
        </Typography>
      </Grid>
      <Grid container spacing={2} justifyContent="center" sx={{ width: '95%', mx: 'auto' }}>
        <Grid item xs={12} md={4} style={{ padding: '0 10px' }}>
          <StyledBox>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Initial Investment Amount</Typography>
            <Typography variant="h4">${initialInvestmentAmount}</Typography>
          </StyledBox>
          <StyledBox>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Projected Investment Amount</Typography>
            <Typography variant="h4">${projectedInvestmentAmount}</Typography>
          </StyledBox>
        </Grid>
        <Grid item xs={12} md={8} style={{ padding: '0 10px' }}>
          <StyledBox>
            <svg ref={svgRef}></svg>
          </StyledBox>
          <StyledBox>
            {/* Placeholder for Correlation Graph */}
          </StyledBox>
        </Grid>
      </Grid>
    </>
  );
};

export default OutputPage;