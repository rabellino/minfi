import { Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';

import NavbarButtons from './NavbarButtons';

import logo from '../../../assets/img/logo.png';

function Navbar() {
  return (
    <Flex
      width="100%"
      height="fit-content"
      padding="0.5rem 2rem"
      alignItems="center"
      justifyContent="space-between"
      background="var(--main-navbar-bg)"
    >
      <Image alt="minfi" maxHeight="64px" objectFit="cover" src={logo} />
    </Flex>
  );
}

export default Navbar;