import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.100',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
      },
    }),
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        lineHeight: 'shorter',
      },
    },
    Text: {
      baseStyle: {
        lineHeight: 'tall',
      },
    },
    IconButton: {
      variants: {
        colorModeToggle: {
          bg: 'transparent',
          _hover: {
            bg: 'gray.100',
          },
          _dark: {
            _hover: {
              bg: 'gray.700',
            },
          },
        },
      },
    },
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  colors: {
    brand: {
      50: '#f0e4ff',
      100: '#cbb2ff',
      200: '#a480ff',
      300: '#7c4dff',
      400: '#541aff',
      500: '#3b00e6',
      600: '#2e00b4',
      700: '#210082',
      800: '#140051',
      900: '#070021',
    },
    background: {
      light: '#E2E8F0',  // A mid-tone grey/blue
      dark: '#1A202C',   // A darker, more readable grey/blue for dark mode
    },
    card: {
      light: 'white',
      dark: 'gray.800',  // Slightly lighter than background for better contrast
    },
    text: {
      light: {
        primary: 'gray.800',
        secondary: 'gray.600',
      },
      dark: {
        primary: 'gray.100',
        secondary: 'gray.300',
      },
    },
  },
});

export default theme; 