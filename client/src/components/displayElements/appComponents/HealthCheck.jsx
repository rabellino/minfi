import { useState } from 'react';

// HealthCheck is an application component containing a single button that when
// clicked will invoke the backend endpoint: /api/health via HTTP
const HealthCheck = () => {
  const [status, setStatus] = useState('');

  const checkHealth = async () => {
    try {
      const response = await fetch('/api/health'); // Calls the proxied endpoint
      const data = await response.json();
      setStatus(data.message || 'Health check successful');
    } catch (error) {
      setStatus('Error fetching health status');
    }
  };

  return (
    <div>
      <button onClick={checkHealth}>Check Health</button>
      <p>{status}</p>
    </div>
  );
};

export default HealthCheck;