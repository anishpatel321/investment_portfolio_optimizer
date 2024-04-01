import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function SynchronizedLineChart() {
  // Retrieve datasets from Redux store
  const dfAdjClose = useSelector(state => state.outputs.df_adj_close);

  // State for formatted data
  const [chartData, setChartData] = useState([]);
  const [xDomain, setXDomain] = useState([0, 0]);
  const [yDomain, setYDomain] = useState([0, 0]);
  const [xTicks, setXTicks] = useState([]);
  const [yTicks, setYTicks] = useState([]);
  
  const colors = [
    '#FF5733', // Red
    '#FFC300', // Yellow
    '#FFFFFF', // White
    '#FF33E6', // Pink
    '#33FF57', // Lime
    '#00FFFF', // Cyan
    '#2F99FF', // Blue
    '#808080', // Gray
    '#000000', // Black
    '#008000', // Green
    '#FFA500', // Orange
];
  
  const getColor = (index) => {
    return colors[index % colors.length];
  };

  // Effect to format data
  useEffect(() => {
    // Format data function
    const formatData = (dfAdjClose) => {
      const reformattedData = [];

      // Iterate over each ticker in df_adj_close
      Object.keys(dfAdjClose).forEach(ticker => {
        // Iterate over each date-price pair for the current ticker
        Object.entries(dfAdjClose[ticker]).forEach(([date, price]) => {
          // Push an object representing a data point to the reformattedData array
          reformattedData.push({ ticker, date, x: date, y: price });
        });
      });

      return reformattedData;
    };

    // Update domain values
    if (dfAdjClose) {
      const adjCloseFormatted = formatData(dfAdjClose);

      // Initialize min and max values
      let minX = adjCloseFormatted[0].x, maxX = adjCloseFormatted[0].x;
      let minY = adjCloseFormatted[0].y, maxY = adjCloseFormatted[0].y;

      // Find min and max values
      adjCloseFormatted.forEach(d => {
        minX = Math.min(minX, d.x);
        maxX = Math.max(maxX, d.x);
        minY = Math.min(minY, d.y);
        maxY = Math.max(maxY, d.y);
      });

      // Generate an array of x-axis ticks from min to max with 10 steps
      const newXticks = Array.from({length: 9}, (_, i) => parseFloat((minX + i * (maxX - minX) / 8).toFixed(2)));

      // Transform minY and maxY to logarithmic scale
      let logMinY = Math.log10(minY);
      let logMaxY = Math.log10(maxY);

      // Generate an array of y-axis ticks from min to max with 10 steps
      const newYticks = Array.from({length: 11}, (_, i) => {
        let logValue = logMinY + i * (logMaxY - logMinY) / 10;
        return Math.pow(10, logValue);
      });

      setXTicks(newXticks);
      setYTicks(newYticks);

      // Update state with new domain values, expanding them slightly for padding
      setXDomain([minX - 0.01, maxX + 0.01]);
      setYDomain([minY - 0.01, maxY + 0.01]);

      setChartData(adjCloseFormatted);
    }
  }, [dfAdjClose]); // Dependency array includes all datasets

  return (
    <ResponsiveContainer width="100%" height={800}>
  <LineChart
    margin={{ top: 30, right: 30, bottom: 20, left: 70 }}
    data={chartData}
  >
    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
    <XAxis
      type="number"
      dataKey="x"
      domain={xDomain}
      label={{ value: 'Date', position: 'insideBottom', dy: 30, fill: 'white' }}
      tickFormatter={value => new Date(value).toISOString().split('T')[0]}
      stroke="white" // Set the stroke color to white
      ticks={xTicks} 
    />
    <YAxis 
        type="number"
        domain={yDomain} 
        label={{ value: 'Price ($) - Log scale', position: 'outsideLeft', angle:-90, dx: -50, fill: 'white' }}
        // tickFormatter={(value) => value.toFixed(0)}
        tickFormatter={(value) => `${value >= 1 ? value.toFixed(0) : value.toFixed(2)}`}
        stroke="white" // Set the stroke color to white
        scale="log"
        ticks={yTicks} 
    />
    <Tooltip contentStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} formatter={(value) => value.toFixed(2)}/>
    <Legend 
      verticalAlign="bottom" 
      align="center" 
      wrapperStyle={{ paddingBottom: '10px', paddingTop: '50px' }} 
    />
    {Object.keys(dfAdjClose).map((ticker, index) => (
      <Line
        key={index}
        type="linear"
        dot={false}
        dataKey="y"
        data={chartData.filter(entry => entry.ticker === ticker)}
        name={ticker}
        stroke={getColor(index)}
      />
    ))}
  </LineChart>
</ResponsiveContainer>

  );
}

export default SynchronizedLineChart;
