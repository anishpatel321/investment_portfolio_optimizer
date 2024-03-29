import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

function PortScatter() {
  // Retrieve datasets from Redux store
  const dfHistorical = useSelector(state => state.outputs.df_historical);
  const dfHistTrend = useSelector(state => state.outputs.df_historical_trendline);

  // State for formatted data
  const [chartData, setChartData] = useState([]);
  const [histTrendChartData, setHistTrendChartData] = useState([]);
  
  const [xDomain, setXDomain] = useState([0, 0]);
  const [yDomain, setYDomain] = useState([0, 0]);

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
    if (dfHistorical) {
      const historicalFormatted = formatData(dfHistorical);

      // Initialize min and max values
      let minX = historicalFormatted[0].x, maxX = historicalFormatted[0].x;
      let minY = historicalFormatted[0].y, maxY = historicalFormatted[0].y;

      // Find min and max values
      historicalFormatted.forEach(d => {
        minX = Math.min(minX, d.x);
        maxX = Math.max(maxX, d.x);
        minY = Math.min(minY, d.y);
        maxY = Math.max(maxY, d.y);
      });

    if(dfHistTrend){
      setHistTrendChartData(formatData(dfHistTrend));
    }
      

      // Update state with new domain values, expanding them slightly for padding
      setXDomain([minX - 0.01, maxX + 500000]);
      setYDomain([minY - 0.01, maxY + 20]);

      setChartData(historicalFormatted);
    }
  }, [dfHistorical, dfHistTrend]); // Dependency array includes all datasets

  return (
    <ResponsiveContainer width="100%" height={800}>
      <ComposedChart
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
          stroke="white"
        />
        <YAxis 
            type="number"
            domain={yDomain} 
            label={{ value: 'Price ($)', position: 'outsideLeft', dx: -50, fill: 'white' }}
            tickFormatter={(value) => value.toFixed(0)}
            stroke="white"
        />
        <Tooltip />
        <Legend 
          verticalAlign="bottom" 
          align="center" 
          wrapperStyle={{ paddingBottom: '10px', paddingTop: '50px' }} 
        />
        {Object.keys(dfHistorical).map((ticker, index) => (
          <Line
            key={index}
            type="monotone"
            dot={false}
            dataKey="y"
            data={chartData.filter(entry => entry.ticker === ticker)}
            name={ticker}
            stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} // Random color
          />
        ))}
        {histTrendChartData.length > 0 && (
          <Line
            type="natural"
            dot={false}
            dataKey="y"
            data={histTrendChartData}
            name="Historical Trend"
            stroke="#ff7300"
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default PortScatter;
