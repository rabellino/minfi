import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import logo from '../../../assets/img/logo.png';

function TopNav() {
  return (
    <Flex
      width="100%"
      height="fit-content"
      padding="0.5rem 2rem"
      alignItems="flex-end"
      justifyContent="space-between"
      background="var(--main-navbar-bg)"
    >
      <Flex gap="1rem" alignItems="center" width="100%">
        <Image alt="minfi logo" maxHeight="40px" objectFit="cover" src={logo} />
        <Box>
          <Heading fontSize="4xl" className="gradient-text">
            minfi
          </Heading>
        </Box>
      </Flex>
    </Flex>
  );
}

export default TopNav;