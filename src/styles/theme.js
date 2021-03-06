import { extendTheme, } from '@chakra-ui/react';

const theme = extendTheme({
  // components: {
  //   Button: {
  //     baseStyle: {
  //       fontWeight: '800',
  //     },
  //   },
  // },
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  config: {
    initialColorMode: 'dark',
  },
  fonts: {
    body: 'Nunito Sans',
    mono: 'Nunito Sans',
    heading: 'Nunito Sans',
  },
});
export default theme;