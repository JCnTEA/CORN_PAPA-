
import { useState, useEffect } from 'react';

export default function PublicDisplay() {
  const [data, setData] = useState(null);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/tesla/charge-state-latest');
      const result = await response.json();
      setData(result);
    };

    fetchData();
    const dataInterval = setInterval(fetchData, 10000);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = '/';
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  if (!data) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>等待授權連線中...</div>;
  }

  const getProgressColor = () => {
    if (data.battery_level > 50) return 'green';
    if (data.battery_level > 20) return 'orange';
    return 'red';
  };

  const circleStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    border: `15px solid ${getProgressColor()}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2em',
    margin: '20px auto',
    background: '#f9f9f9',
  };

  const cardStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    background: '#ffffff',
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ marginBottom: '5px' }}>{data.vehicle_name || 'Tesla 車輛'}</h2>
      <p style={{ marginBottom: '20px', fontSize: '1em', color: '#555' }}>{data.plate || '未提供車牌'}</p>
      <div style={circleStyle}>{data.battery_level}%</div>
      <p>可行駛 {data.battery_range} 公里</p>
      <h2 style={{ color: data.charging_state === 'Charging' ? 'green' : 'gray' }}>
        {data.charging_state === 'Charging' ? `充電中 (${data.charger_power} KW)` : '未充電'}
      </h2>
      <p style={{ marginTop: '10px', fontSize: '0.9em', color: 'red' }}>
        {countdown} 秒後自動返回首頁
      </p>
    </div>
  );
}
