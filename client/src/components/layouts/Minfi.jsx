import React from 'react';
import { Box, Container, Heading, Text } from '@chakra-ui/react';

const Minfi = () => {
  return (
    <Box
      as="main"
      flex="1"
      minH="100vh"
      pt={{ base: "60px", md: "70px" }}
    >
      <Container maxW="1200px" py={{ base: 12, md: 20 }}>
        <Heading>Minfi Page</Heading>
        <Text>This is a simplified version of the Minfi component.</Text>
      </Container>
    </Box>
  );
};

export default Minfi; 