import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    
  };

  const labels = ['January', 'February',  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Store 1',
        data: labels.map(() => { return Math.random() * 1000 + 500 }),
        backgroundColor: '#FFCC70',
        borderRadius: 10,
      },
      {
        label: 'Store 2',
        data: labels.map(() => { return Math.random() * 1000 + 500 }),
        backgroundColor: '#EA7466',
        borderRadius: 10
      },
    ],
  };

  return (
    <TitleCard title={"Revenue"}>
      <Bar options={options} data={data} />
    </TitleCard>

  )
}


export default BarChart