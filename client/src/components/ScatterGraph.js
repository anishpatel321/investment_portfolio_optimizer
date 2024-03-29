import React from 'react';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

function ScatterGraph({ chartData, xAxisLabel, yAxisLabel }) {

  return (
    <ScatterChart 
      series={chartData.map(dataset => ({
        data: dataset.data,
        type: 'scatter',
        name: dataset.name,
        color: dataset.color
      }))}
      xAxis={[{
        label: xAxisLabel,
        tickLabelStyle: { fill: 'white' },
        labelStyle: { fill: 'white' },
        stroke: 'white !important'
      }]}
      yAxis={[{
        label: yAxisLabel,
        tickLabelStyle: { fill: 'white' },
        labelStyle: { fill: 'white'},
        stroke: 'white !important'
      }]}
      height={950}
    />
  );
}



export default ScatterGraph;
