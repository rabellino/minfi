import React from 'react';
import { Box, Flex, Link, Button, HStack, IconButton, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { FaHome } from 'react-icons/fa';

const TopNav = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box 
      as="nav" 
      position="fixed" 
      w="100%" 
      p={4} 
      bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
      color={colorMode === 'light' ? 'gray.800' : 'white'}
      borderBottom="1px"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
    >
      <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
        <Link as={RouterLink} to="/" fontWeight="bold" display="flex" alignItems="center" gap={2}>
          <FaHome />
          Michael Rabellino
        </Link>
        <HStack spacing={4}>
          <Button as={RouterLink} to="/about" variant="ghost">
            About
          </Button>
          <Button as={RouterLink} to="/resume" variant="ghost">
            Resume
          </Button>
          <Button as={RouterLink} to="/minfi" variant="ghost">
            Minfi
          </Button>
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle color mode"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default TopNav;