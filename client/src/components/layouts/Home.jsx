import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Flex, Heading, Image, Text } from '@chakra-ui/react';


import HealthCheck from "../../components/displayElements/appComponents/HealthCheck";

function Home() {
  return (
    <Flex flexDir="column" w="50%">
      <HealthCheck />
    </Flex>
 );
}

export default Home;