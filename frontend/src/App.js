import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function App() {

  const [data,setData] = useState([]);

  useEffect(()=>{

    fetch("http://localhost:5000/api/time")
    .then(res=>res.json())
    .then(result=>setData(result));

  },[]);


  const chartData = {
    labels: data.map(item => item.website),
    datasets: [
      {
        label: "Time Spent (seconds)",
        data: data.map(item => (item.timeSpent/1000).toFixed(1))
      }
    ]
  };

const mostUsedSite =
  data.length > 0
    ? data.reduce((max, item) =>
        item.timeSpent > max.timeSpent ? item : max
      ).website
    : "No data yet";


return (
  <div style={{
    width:"900px",
    margin:"auto",
    marginTop:"50px",
    textAlign:"center"
  }}>
    <h1>🚀 Productivity Dashboard</h1>

    <h2 style={{color:"red"}}>
      ⚠️ Most Distracting Site: {mostUsedSite}
    </h2>

    <Bar data={chartData}/>
  </div>
);

}

export default App;
