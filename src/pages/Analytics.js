import { Box, Grid, Typography } from "@mui/material";
import logo from '../assets/logo.png'
import { Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title, } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

import { getDailySales } from '../api/api.js'
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import { useEffect, useState } from 'react'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


function Donut() {
  const data = {
    datasets: [
      {
        label: 'Pesos',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
        ],
      },
    ],
  };

  return (<Doughnut data={data} />)
}

function LineChart(){
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    getDailySales(cookies.accessToken).then(res => {
      const tempArray = []
      let endDate = dayjs().format('YYYY-MM-DD')
      let startDate = dayjs().add(-30, 'day').format('YYYY-MM-DD')
      while(startDate != endDate){
        tempArray.push({x: startDate, y: res.data.find(item => {return startDate === item.transaction_date})?.total_sales ?? 0})
        startDate = dayjs(startDate).add(1, 'day').format('YYYY-MM-DD')
      }
      setChartData(tempArray)
    })
  }, [])
  
  const data = {
    datasets: [{
      label: 'Daily Sales',
      data: chartData,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  return (<Line style={{width: '100%', marginLeft: 'auto', marginRight: 'auto'}} options={options} data={data} />)
}

export default function Analytics() {
  
  return (
    <Box sx={{p: 5}}>
      <Typography sx={{fontWeight: 700, mx: 'auto', pl: 5}} variant="h3" color="initial">
        Overview
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={4} sx={{textAlign: 'center'}}>
          <Box component="img" src={logo} />
          <Box>
            <Typography variant="p" color="initial" sx={{fontWeight: 700, fontSize: '2rem'}}>Web POS System</Typography>
          </Box>
          <Typography variant="p" sx={{fontWeight: 700, color:'grey', opacity: .7}}>By Ben John Villabesa</Typography>
          <Box sx={{mt: 5, textAlign:'left', mx: 'auto', width: '21rem'}}>
            <Box>
              <Typography variant="p" sx={{fontWeight: 800, fontSize: '1.5rem', textShadow: "0 0 5px grey", color:'grey', opacity: .7}}>Overview</Typography>
            </Box>
            <Box>
              <Typography variant="p" sx={{fontWeight: 800, fontSize: '1.5rem', textShadow: "0 0 5px grey", color:'grey', opacity: .7}}>Calendar</Typography>
            </Box>
            <Box>
              <Typography variant="p" sx={{fontWeight: 800, fontSize: '1.5rem', textShadow: "0 0 5px grey", color:'grey', opacity: .7}}>Projects</Typography>
            </Box>
          </Box>
          <Box sx={{mt:5, backgroundColor: 'white', height: '10rem', width: '25rem', mx:'auto',  borderRadius: '15px', boxShadow: '-2px 5px 5px grey', textAlign: 'left', px: 4, py: 2, fontWeight: 500, fontSize: '1.4rem'}}>
            <ul>
              <li style={{listStyleType: 'none'}}>Statistics</li>
              <li style={{listStyleType: 'none', marginTop: '10px'}}>Production</li>
              <li style={{listStyleType: 'default',marginTop: '10px', fontWeight: 700}}>Sales</li>
            </ul>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
          <Box sx={{backgroundColor: 'white', borderRadius: '15px', minHeight: '25rem', height: '50%', mt: 2, boxShadow: '0 0 5px black', p: 1}}>
            <Grid container  sx={{height: '100%'}}>
              <Grid item xs={6} sx={{height: 'inherit'}}>
                <Box sx={{display: 'flex', alignItems: 'center', height: 'inherit',}}>
                  <Donut />
                </Box>
              </Grid>
              <Grid item xs={6} sx={{height: 'inherit'}}>
                <Box sx={{display: 'flex', p: 3, flexDirection: 'column', gap:'1rem', justifyContent: 'space-between', height: 'inherit', alignItems: 'center'}}>
                  <Box>Store Quota</Box>
                  <Box sx={{display: 'flex', width:'100%', justifyContent:'space-between', p: 2, gap: {xl: 4, lg: 10, md: 10, sm: 10, xs: 10}}}>
                    <Box sx={{color: 'green', fontWeight: 600}}>General</Box>
                    <Box sx={{color: 'green', fontWeight: 600}}>20,000php</Box>
                  </Box>
                  <Box sx={{display: 'flex', width:'100%', justifyContent:'space-between', p: 2, backgroundColor: 'rgba(0,200,0,.1)', borderRadius: '15px', gap: {xl: 4, lg: 10, md: 10, sm: 10, xs: 10}}}>
                    <Box sx={{color: 'green', fontWeight: 600}}>Worth of Stock</Box>
                    <Box sx={{color: 'green', fontWeight: 600}}>20,000php</Box>
                  </Box>
                  <Box sx={{display: 'flex', width:'100%', justifyContent:'space-between', p: 2, backgroundColor: 'rgba(0,200,0,.1)', borderRadius: '15px', gap: {xl: 4, lg: 10, md: 10, sm: 10, xs: 10}}}>
                    <Box sx={{color: 'green', fontWeight: 600}}>Sold</Box>
                    <Box sx={{color: 'green', fontWeight: 600, textAlign: 'right'}}>20,000php</Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{backgroundColor: 'white', borderRadius: '15px', minHeight: '15rem', height: '30%', mt: 10, boxShadow: '0 0 5px black', p: 1}}>
            <LineChart />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
          
          <Box sx={{backgroundColor: 'white', borderRadius: '15px', minHeight: '15rem', height: '30%', mt: 2, boxShadow: '0 0 5px black', p: 1, maxWidth: "80%", mx: 'auto'}}>

          </Box>
          
          <Box sx={{backgroundColor: 'white', borderRadius: '15px', minHeight: '15rem', height: '55%', mt: 10, boxShadow: '0 0 5px black', p: 1, maxWidth: "80%", mx: 'auto'}}>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
