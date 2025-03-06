// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const fonts = {
  heading: `'Inter', sans-serif`,
  body: `'Inter', sans-serif`,
};

const styles = {
  global: {
    // styles for the `body`
    body: {
      color: ['gray.800', 'gray.200'],
    },
  },
};

const components = {
  Badge: {
    variants: {
      'ongoing-impact': {
        bg: 'red.500',
        fontWeight: '700',
        whiteSpace: 'normal',
      },
      'next-impact': {
        bg: 'orange.500',
        fontWeight: '700',
        whiteSpace: 'normal',
      },
      'no-impact': {
        bg: 'green.500',
        fontWeight: '700',
        whiteSpace: 'normal',
      },
      MINOR: {
        bg: 'var(--severity-minor)',
        fontWeight: '700',
        fontSize: 'md',
        color: 'var(--black)',
      },
      MODERATE: {
        bg: 'var(--severity-moderate)',
        fontWeight: '700',
        fontSize: 'md',
        color: 'var(--black)',
      },
      SEVERE: {
        bg: 'var(--severity-severe)',
        fontWeight: '700',
        fontSize: 'md',
        color: 'var(--black)',
      },
    },
  },
  Tabs: {
    variants: {
      'rounded-gradient': {
        tab: {
          borderRadius: 'full',
          fontWeight: '600',
          fontSize: 'sm',
          color: 'gray.400',
          _selected: {
            bg: 'var(--light-accent-gradient)',
            color: 'purple.900',
          },
        },
      },
    },
  },
  Button: {
    variants: {
      'impact-selected': {
        rounded: 'full',
        bg: 'blue.100',
        color: 'blue.700',
        _hover: {
          bg: 'blue.100',
        },
      },
      'impact-ghost': {
        rounded: 'full',
        bg: 'transparent',
        color: 'gray.400',
        _hover: {
          bg: 'transparent',
        },
      },
      'edit-hazard': {
        bg: 'gray.500',
        _hover: {
          bg: 'gray.600',
        },
      },
      // 'save-hazard': {
      // 	bg: 'blue.500',
      // 	_hover: {
      // 		bg: 'blue.600',
      // 	},
      // },
    },
  },
};
// 	DrawerContent: {
// 		variants: {
// 			'dark-drawer': {
// 				bg: 'linear-gradient(90deg, rgba(76, 109, 184, 0.7) 0%, rgba(24, 40, 72, 0.7) 100%);',
// 				color: 'green.200',
// 			},
// 		},
// 	},
// };

// 3. extend the theme
const theme = extendTheme({ config, fonts, colors, styles, components });

export default theme;