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
  
  const colors = [
    '#FF5733', // Red
    '#33FF57', // Green
    '#3357FF', // Blue
    '#FF33E6', // Pink
    '#33E6FF', // Cyan
    '#FFC300', // Yellow
    '#8533FF', // Purple
    '#FF336B', // Salmon
    '#FF5733', // Orange
    '#33FF57'  // Lime
  ];
  
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
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
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      type="number"
      dataKey="x"
      domain={xDomain}
      label={{ value: 'Date', position: 'insideBottom', dy: 30, fill: 'white' }}
      tickFormatter={value => new Date(value).toISOString().split('T')[0]}
      stroke="white" // Set the stroke color to white
    />
    <YAxis 
        type="number"
        domain={yDomain} 
        label={{ value: 'Price ($)', position: 'outsideLeft', dx: -50, fill: 'white' }}
        tickFormatter={(value) => value.toFixed(2)}
        stroke="white" // Set the stroke color to white
    />
    <Tooltip />
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
        // stroke={getRandomColor} // Random color
        stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
      />
    ))}
  </LineChart>
</ResponsiveContainer>

  );
}

export default SynchronizedLineChart;
