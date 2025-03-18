import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Flex, Heading, Image, Text } from '@chakra-ui/react';


import HealthCheck from "../../components/displayElements/appComponents/HealthCheck";

function Home() {
  return (
    <Flex
      flexDir="column"
      w="50%" 
      alignItems="center" // Centers content horizontally
      justifyContent="center" // Centers content vertically
      height="100vh" // Takes full viewport height
      margin="auto" // Ensures horizontal centering
      gap="1.5rem" // Adds space between child elements
    >
      <Text textAlign="left" fontSize="lg" mb="1rem" color="gray.700">
        This application provides a health check for the backend services. 
        Click the button below to check the API status.
      </Text>
      <HealthCheck />
    </Flex>
 );
}

export default Home;