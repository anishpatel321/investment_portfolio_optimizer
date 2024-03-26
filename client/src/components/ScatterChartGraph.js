import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { ScatterPlot, ChartsXAxis, ChartsYAxis, ResponsiveChartContainer } from '@mui/x-charts';


function ScatterChartGraph() {
  const dfMEF = useSelector(state => state.outputs.df_MEF);
  const dfCML = useSelector(state => state.outputs.df_CML);
  const dfCAL = useSelector(state => state.outputs.df_CAL);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const formatData = (data) => 
      Object.entries(data.Volatility).map(([index, volatility]) => ({
        id: index,
        x: volatility,
        y: data.Returns[index],
      }));

    if (dfMEF && dfCML && dfCAL) {
      const mefData = formatData(dfMEF);
      const cmlData = formatData(dfCML);
      const calData = formatData(dfCAL);

      setChartData([
        { name: 'MEF', data: mefData, color: 'blue' }, // Example color, adjust as needed
        { name: 'CML', data: cmlData, color: 'green' }, // Example color, adjust as needed
        { name: 'CAL', data: calData, color: 'red' } // Example color, adjust as needed
      ]);
    }
  }, [dfMEF, dfCML, dfCAL]);

  return (
    <ScatterChart 
      series={chartData.map(dataset => ({
        data: dataset.data,
        type: 'scatter',
        name: dataset.name,
        color: dataset.color, // Ensure your chart library supports these properties
      }))}
       //bottomAxis={{
        // label: "my axis",
      // }}
      height={300}
    />
    
    
  );
}



export default ScatterChartGraph;
