"use client"
import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend)
import { DashboardData } from '@/models/dashboardData';

interface DashboardChartProps {
    dashboardData: DashboardData; // Define the children prop type
}

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardChart:React.FC<DashboardChartProps> = ({ dashboardData :DashboardData  }) => {

    console.log({DashboardData});

    console.log(DashboardData.monthlyOverview.map(eachData => eachData.paidFee));
    
    const today = new Date();
    const year = today.getFullYear();
    
    // Sample data
    const data = {
        labels: DashboardData.monthlyOverview.map(eachData => eachData.month_name), // X-axis labels
        datasets: [
            {
                label: 'Paid Amount',
                data: DashboardData.monthlyOverview.map(eachData => eachData.paidFee), // Y-axis values
                borderColor: '#17c964', // Line color
                backgroundColor: '#108f47', // Fill under the line
                tension: 0.4, // Curved line
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        interaction: {
          mode: 'index' as const,
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: `Overview ${year }`,
          },
        },
        scales: {
          y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
          },
          y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };

       // Chart options
  const piOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Monthly Overview", // Hardcoded title with the year
      },
    },
  };

  const piData = {
    labels: [
      "Total students",
      "New Students",
      "Total Fees",
      "Paid Fees",
      "Unpaid Fees",
      "Paid Students",
      "Unpaid Students",
    ], // X-axis labels (months)
    datasets: [
      {
        label: "Monthly Overview",
        data: [DashboardData.totalStudents, DashboardData.newStudents, DashboardData.currentMonthTotalFee, DashboardData.currentMonthPaidFee, DashboardData.currentMonthUnpaidFee, DashboardData.paidStudents, DashboardData.unpaidStudents], // Hardcoded Y-axis values
        backgroundColor: [
          "#223e9ed9",
          "#398a5fd9",
          "#930521d9",
          "#585f63d9",
          "#2585a0d9",
          "#227372d9",
          "#227372d9",
        ],
        hoverBackgroundColor: [

          "#5765B4",
          "#64A07E",
          "#A84F58",
          "#787D81",
          "#5A9CB5",
          "#578D8D",
          "#32CD32",
        ],
        borderWidth: 1,
      },
    ],
  };

    return (
        <div className='w-full mt-6 h-auto flex flex-row gap-4'>
            <div className='w-[70%] p-5 bg-[#191E23] rounded-md'>

                <Line data={data} options={options} />
            </div>
            <div className='w-[30%] p-5 bg-[#191E23] rounded-md'>

                <Pie data={piData} options={piOptions} />
            </div>
        </div>
    );
};

export default DashboardChart;
