import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';

const lineData: number[] = [];
const barData: number[] = [];
const xAxis: number[] = [];

const pointsPerSerie = 1000;

for (let i = 0; i < pointsPerSerie; i++) {
  lineData.push(i);
  barData.push(pointsPerSerie - i);
  xAxis.push(i);
}

export default function CompositionBench() {
  return (
    <Box sx={{ width: '100%', overflow: 'auto' }}>
      <Paper sx={{ margin: 1, height: 300, width: 600 }} elevation={3}>
        <ChartContainer
          series={[
            {
              type: 'bar',
              data: barData,
            },
            {
              type: 'line',
              data: lineData,
              showMark: false,
            },
          ]}
          xAxis={[
            {
              data: xAxis,
              scaleType: 'band',
              id: 'x-axis-id',
              height: 45,
            },
          ]}
        >
          <BarPlot skipAnimation={true} />
          <ChartsXAxis label="X axis" axisId="x-axis-id" />
        </ChartContainer>
      </Paper>
    </Box>
  );
}
