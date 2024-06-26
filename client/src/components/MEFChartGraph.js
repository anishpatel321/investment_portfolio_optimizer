import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ScatterGraph from './ScatterGraph';


function MEFChartGraph() {
  const dfMEF = useSelector(state => state.outputs.df_MEF);
  const dfCML = useSelector(state => state.outputs.df_CML);
  const dfCAL = useSelector(state => state.outputs.df_CAL);
  const dfoptimal = useSelector(state => state.outputs.df_optimal_theoretical);
  const dfgeneratedportfolios = useSelector(state => state.outputs.df_generated_portfolios);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const formatData = (data) => 
      Object.entries(data.Volatility).map(([index, volatility]) => ({
        id: index,
        x: volatility,
        y: data.Returns[index],
      }));

    if (dfMEF && dfCML && dfCAL && dfgeneratedportfolios && dfoptimal) {
      const mefData = formatData(dfMEF);
      const cmlData = formatData(dfCML);
      const calData = formatData(dfCAL);
      const genData = formatData(dfgeneratedportfolios);
      const optData = formatData(dfoptimal);

      setChartData([
       
        { name: 'CML', data: cmlData, color: 'green' }, // Example color, adjust as needed
        { name: 'CAL', data: calData, color: 'red' }, // Example color, adjust as needed
        { name: 'Generated', data: genData, color: 'purple' }, // Example color, adjust as needed
        { name: 'MEF', data: mefData, color: 'blue'}, // Example color, adjust as needed
        { name: 'Optimal', data: optData, color: 'white'} // Example color, adjust as needed
      
    ]);
    }
  }, [dfMEF, dfCML, dfCAL, dfgeneratedportfolios, dfoptimal ]);

  return (
    <ScatterGraph
      chartData={chartData} 
      xAxisLabel={"volatility"}
      yAxisLabel={"return"}
    />
    
  );
}



export default MEFChartGraph;
