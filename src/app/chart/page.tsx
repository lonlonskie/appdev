'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DashboardPage() {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUserCount(data.length));

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPostCount(data.length));

    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res => res.json())
      .then(data => setCommentCount(data.length));
  }, []);

  const chartOptions = {
    chart: {
      id: 'stats-bar',
    },
    xaxis: {
      categories: ['Users', 'Posts', 'Comments'],
    },
  };

  const chartSeries = [
    {
      name: 'Count',
      data: [userCount, postCount, commentCount],
    },
  ];

  return (
    <div className="p-4 sm:p-6 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto bg-white/30 backdrop-blur-md rounded-2xl shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">User Chart</h1>
      <div className="w-full">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
  
  
}
