
import { PieChart } from '@mui/x-charts/PieChart';


function PieChartGraph(props) {
  const {
    pieChartData
  } = props;

return (
    <PieChart
      series={[
        {
          data: pieChartData,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius:30, additionalRadius: -30, color: 'gray' },
          innerRadius: 20,
        },
      ]}
      height={200}
    />
  );
}

export default PieChartGraph;