import { useState } from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';

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
    <Flex flexDir="column" alignItems="center" gap="1rem">
      <Button 
        onClick={checkHealth}
        colorScheme="blue"
        _hover={{ background: "blue.600" }}
        _active={{ background: "blue.700" }}
      >
        Check API Health
      </Button>
      
      <Text>{status}</Text>
    </Flex>
  );
};

export default HealthCheck;