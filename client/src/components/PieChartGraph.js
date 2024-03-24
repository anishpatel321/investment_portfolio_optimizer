import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

function PieChartGraph() {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchPieChartData = () => {
      fetch('http://localhost:5000/pie-chart-data2')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then(data => {
          // Reformat the incoming data
          const formattedData = data.Ticker.map((ticker, i) => ({
            id: i,  // Use the index as the id
            value: data['Optimal Weights'][i],  // Match the ticker with its corresponding weight
            label: ticker  // Use the ticker as the label
          }));

          console.log('Formatted pie chart data:', formattedData);  // Log the formatted data to the console
          setPieChartData(formattedData);
        })
        .catch(error => console.error('Error fetching pie chart data:', error));
    };

    fetchPieChartData();
  }, []);

  return (
    <PieChart 
      series={[{
        data: pieChartData,
        highlightScope: { faded: 'global', highlighted: 'item' },
        faded: { innerRadius: 40, additionalRadius: -30, color: 'gray' },
        innerRadius: 30,
      }]}
      height={200}
    />
  );
}

export default PieChartGraph;