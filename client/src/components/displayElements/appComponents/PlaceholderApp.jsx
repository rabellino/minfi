import { Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function PlaceholderApp({ isVisible, children, ...props }) {
  return (
    <Flex
      boxSize="100%"
      flexGrow="1"
      display={isVisible ? 'flex' : 'none'}
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {children}
    </Flex>
  );
}

PlaceholderApp.propTypes = {
  isVisible: PropTypes.bool,
  children: PropTypes.node,
};

PlaceholderApp.defaultProps = {
  isVisible: false,
  children: null,
};

export default PlaceholderApp;