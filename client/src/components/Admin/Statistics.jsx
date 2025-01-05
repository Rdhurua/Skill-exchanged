import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    loggedInToday: 0,
    newUsersToday: 0,
    notLoggedInToday: 0,
    currentLoggedIn: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/statistics`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setStats({
          totalUsers: data.totalUsers || 0,
          loggedInToday: data.loggedInToday || 0,
          newUsersToday: data.newUsersToday || 0,
          currentLoggedIn: data.currentLoggedIn || 0,
          notLoggedInToday: (data.totalUsers || 0) - (data.loggedInToday || 0),
        });
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchStatistics();

    // Set up interval for continuous fetching
    const intervalId = setInterval(fetchStatistics, 5000); // Fetch every 5 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures it only sets up once on mount

  // Pie Chart Data for Logged In vs. Not Logged In Today
  const dailyPieData = {
    labels: ['Logged In Today', 'Not Logged In Today'],
    datasets: [
      {
        label: 'Daily User Activity',
        data: [stats.loggedInToday, stats.notLoggedInToday],
        backgroundColor: ['#34D399', '#F87171'], // Green and red
        hoverBackgroundColor: ['#10B981', '#EF4444'],
      },
    ],
  };

  // Pie Chart Data for Current Logged-In Users
  const currentPieData = {
    labels: ['Currently Logged In', 'Currently Logged Out'],
    datasets: [
      {
        label: 'Current Login Status',
        data: [stats.currentLoggedIn, stats.totalUsers - stats.currentLoggedIn],
        backgroundColor: ['#60A5FA', '#A5B4FC'], // Blue and purple
        hoverBackgroundColor: ['#3B82F6', '#818CF8'],
      },
    ],
  };

  if (loading) {
    return <p>Loading statistics...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Logged In Today</h2>
          <p className="text-2xl font-bold">{stats.loggedInToday}</p>
        </div>
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-lg font-semibold">New Users Today</h2>
          <p className="text-2xl font-bold">{stats.newUsersToday}</p>
        </div>
      </div>

      <div className='flex flex-col md:flex md:flex-row justify-around bg-white shadow-md'>
      <div className="bg-white p-6 rounded-lg shadow-md ">
        <h2 className="text-lg font-semibold mb-4">Daily User Activity</h2>
        <div className="h-80">
          <Pie data={dailyPieData} />
        </div>
      </div>

    {/* current login status */}
      <div className="bg-white  p-6 rounded-lg border-l-2 border-black shadow-md">
        <h2 className="text-lg font-semibold mb-4 ">Current Login Status</h2>
        <div className="h-80">
          <Pie data={currentPieData} />
        </div>
      </div>
      </div>

    </div>
  );
};

export default Statistics;
