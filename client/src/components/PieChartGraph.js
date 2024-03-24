import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import { PieChart } from '@mui/x-charts/PieChart';

function PieChartGraph() {
  // Use useSelector to access the df_max_sharpe_below_threshold_generated_portfolio from the Redux store
  const selectorData = useSelector(state => state.outputs.df_max_sharpe_below_threshold_generated_portfolio);

  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    // Check if dfMaxSharpe is not null
    if (selectorData) {
      // Reformat the data for the PieChart
      const formattedData = selectorData.Ticker.map((ticker, i) => ({
        id: i,  // Use the index as the id
        value: selectorData['Optimal Weights'][i],  // Match the ticker with its corresponding weight
        label: ticker  // Use the ticker as the label
      }));

      console.log('Formatted pie chart data:', formattedData);  // Log the formatted data to the console
      setPieChartData(formattedData);
    }
  }, [selectorData]); // Dependency array to trigger effect when dfMaxSharpe changes

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
