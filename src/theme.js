import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#E6F6F6',
      100: '#C2E7E6',
      200: '#9ED8D7',
      300: '#7AC9C7',
      400: '#56BAB8',
      500: '#319795', // primary teal
      600: '#287A78',
      700: '#1F5C5B',
      800: '#163D3D',
      900: '#0C1F1E',
    },
    navy: {
      50: '#E7ECF2',
      100: '#C2CEDF',
      200: '#9DAFCC',
      300: '#7891B9',
      400: '#5373A6',
      500: '#2E5493',
      600: '#254376',
      700: '#1C3358',
      800: '#13223B',
      900: '#0A111D',
    },
    accent: {
      50: '#FEF3EA',
      100: '#FCE0CA',
      200: '#F9CDAA',
      300: '#F7BA8A',
      400: '#F5A76A',
      500: '#ED8936', // accent orange
      600: '#E06E14',
      700: '#B85A10',
      800: '#8F460D',
      900: '#663209',
    },
    success: {
      500: '#38A169',
    },
    warning: {
      500: '#DD6B20',
    },
    error: {
      500: '#E53E3E',
    },
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  fontWeights: {
    normal: 300,
    medium: 500,
    bold: 700,
  },
  space: {
    1: '0.25rem', // 4px
    2: '0.5rem',  // 8px
    3: '0.75rem', // 12px
    4: '1rem',    // 16px
    5: '1.25rem', // 20px
    6: '1.5rem',  // 24px
    8: '2rem',    // 32px
    10: '2.5rem', // 40px
    12: '3rem',   // 48px
    16: '4rem',   // 64px
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          border: '1px solid',
          borderColor: 'brand.500',
          color: 'brand.500',
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'md',
        },
      },
    },
  },
  breakpoints: {
    sm: '30em',    // 480px
    md: '48em',    // 768px
    lg: '64em',    // 1024px
    xl: '80em',    // 1280px
    '2xl': '96em', // 1536px
  },
})

export default theme