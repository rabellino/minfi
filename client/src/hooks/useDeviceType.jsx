import { useBreakpointValue } from '@chakra-ui/react';

/**
 * @returns {string} "mobile", "tablet", or "desktop", based on screen width
 */
function useDeviceType() {
  const deviceType = useBreakpointValue({ base: 'mobile', md: 'tablet', lg: 'desktop' });
  return deviceType;
}

export default useDeviceType;