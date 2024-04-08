import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

function PortScatter() {
  // Retrieve datasets from Redux store
  const dfHistorical = useSelector(state => state.outputs.df_historical);
  const dfHistTrend = useSelector(state => state.outputs.df_historical_trendline);
  const [xTicks, setXTicks] = useState([]);
  const [yTicks, setYTicks] = useState([]);

  const colors = [
    '#FF5733', // Red
    '#FFC300', // Yellow
    '#FFFFFF', // White
    '#FF33E6', // Pink
    '#FF336B', // Salmon
    '#FF5733', // Orange
    '#33FF57', // Lime
    '#FFA500', // Orange
    '#FFFF00', // Yellow
    '#ADFF2F', // GreenYellow
    '#FFD700', // Gold
    '#F0E68C', // Khaki
    '#FAFAD2', // LightGoldenRodYellow
    '#FFE4B5', // Moccasin
    '#FFDEAD', // NavajoWhite
    '#FFE4C4', // Bisque
    '#FFDAB9', // PeachPuff
    '#E6E6FA', // Lavender
    '#FFF0F5', // LavenderBlush
    '#FFE4E1', // MistyRose
    '#FFF5EE', // SeaShell
    '#F5FFFA', // MintCream
    '#F0FFF0', // Honeydew
    '#F0FFFF', // Azure
    '#F0F8FF', // AliceBlue
    '#F8F8FF', // GhostWhite
    '#F5F5F5', // WhiteSmoke
    '#FFF5EE', // SeaShell
  ];
  
  const getColor = (index) => {
    return colors[index % colors.length];
  };

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
      
      // Generate an array of x-axis ticks from min to max with 10 steps
      const newXticks = Array.from({length: 9}, (_, i) => parseFloat((minX + i * (maxX - minX) / 8).toFixed(2)));

      // Generate an array of y-axis ticks from min to max with 10 steps
      const newYticks = Array.from({length: 11}, (_, i) => parseFloat((minY + i * (maxY - minY) / 10).toFixed(2)));

      if(dfHistTrend){
        setHistTrendChartData(formatData(dfHistTrend));
      }
      
      setXTicks(newXticks);
      setYTicks(newYticks);

      // Update state with new domain values, expanding them slightly for padding
      setXDomain([minX - 0.01, maxX + 0.01]);
      setYDomain([minY - 0.01, maxY + 0.01]);

      setChartData(historicalFormatted);
    }
  }, [dfHistorical, dfHistTrend]); // Dependency array includes all datasets

  return (
    <ResponsiveContainer width="100%" height={800}>
      <ComposedChart
        margin={{ top: 30, right: 30, bottom: 20, left: 70 }}
        data={chartData}
      >
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4}/>
        <XAxis
          type="number"
          dataKey="x"
          domain={xDomain}
          label={{ value: 'Date', position: 'insideBottom', dy: 30, fill: 'white', fontSize: '2.5vh' }}
          tickFormatter={value => new Date(value).toISOString().split('T')[0]}
          stroke="white"
          ticks={xTicks}
          tick={{ fontSize: '2vh' }}
        />
        <YAxis 
            type="number"
            domain={yDomain} 
            label={{ value: 'Price ($)', position: 'outsideLeft', angle:-90, dx: -50, fill: 'white', fontSize: '2.5vh' }}
            tickFormatter={(value) => value.toFixed(0)}
            stroke="white"
            ticks={yTicks}
            tick={{ fontSize: '2vh' }}
        />
        <Tooltip formatter={(value) => value.toFixed(2)}/>
        <Legend 
          verticalAlign="bottom" 
          align="center" 
          wrapperStyle={{ paddingBottom: '10px', paddingTop: '50px', fontSize: '2.2vh' }} 
        />
        {Object.keys(dfHistorical).map((ticker, index) => (
          <Line
            key={index}
            type="monotone"
            dot={false}
            dataKey="y"
            data={chartData.filter(entry => entry.ticker === ticker)}
            name={ticker}
            stroke='#FFA500' // Random color
            strokeWidth={'0.25vh'}
          />
        ))}
        {histTrendChartData.length > 0 && (
          <Line
            type="natural"
            dot={false}
            dataKey="y"
            data={histTrendChartData}
            name="Historical Trend"
            stroke='#33FF57'
            strokeWidth={'0.25vh'}
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default PortScatter;
