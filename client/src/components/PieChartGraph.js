import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import { PieChart } from '@mui/x-charts/PieChart';

function PieChartGraph() {
  const selectorData = useSelector(state => state.outputs.df_max_sharpe_below_threshold_generated_portfolio);

  console.log('unFormatted pie chart data:', selectorData);
  
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    // Ensure selectorData is defined and both Tickers and Optimal Weights are objects
    if (selectorData && typeof selectorData.Ticker === 'object' && typeof selectorData['Optimal Weights'] === 'object') {
      // Use Object.entries to iterate over Tickers and Optimal Weights objects
      const formattedData = Object.entries(selectorData.Ticker).map(([index, ticker]) => ({
        id: index, // Use the index as the id
        value: selectorData['Optimal Weights'][index] * 100, // Lookup the weight by index and convert to percentage
        label: ticker // Use the ticker as the label
      }));

      console.log('Formatted pie chart data:', formattedData);
      setPieChartData(formattedData);
    }
  }, [selectorData]);

  return (
    <PieChart 
      series={[{
        data: pieChartData,
        highlightScope: { faded: 'global', highlighted: 'item' },
        faded: { innerRadius: 75, additionalRadius: -20, color: 'gray' },
        innerRadius: 60,
      }]}
      height={300}
    />
  );
}

export default PieChartGraph;
