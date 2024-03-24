import React from 'react';
import 'hammerjs';
import { interpolateCividis } from 'd3-scale-chromatic';
import { Chart, ChartSeries, ChartSeriesItem } from '@progress/kendo-react-charts';
import { useState, useEffect } from 'react';

// Given correlation matrix data
const df_cor_matrix = {
  'MSFT': [1.0, 0.8, 0.5, 0.3, 0.2],
  'AAPL': [0.8, 1.0, 0.4, 0.3, 0.2],
  'AMZN': [0.5, 0.4, 1.0, 0.2, 0.1],
  'NVDA': [0.3, 0.3, 0.2, 1.0, 0.5],
  'AVGO': [0.2, 0.2, 0.1, 0.5, 1.0]
};

// Transform the df_cor_matrix into a format suitable for the heatmap
const transformData = (matrix) => {
  const tickers = Object.keys(matrix);
  const data = [];

  tickers.forEach((tickerX, i) => {
    tickers.forEach((tickerY, j) => {
      data.push({
        x: tickerX,
        y: tickerY,
        value: matrix[tickerX][j]
      });
    });
  });

  return data;
};

const heatmapData = transformData(df_cor_matrix);

// Define a color function based on the value
const color = (e) => interpolateCividis(e.value.value);

const HeatmapChart = () => {
  return (
    <Chart>
      <ChartSeries>
        <ChartSeriesItem
          type="heatmap"
          data={heatmapData}
          color={color}
          xField="x"
          yField="y"
          field="value"
        />
      </ChartSeries>
    </Chart>
  );
};

export default HeatmapChart;
