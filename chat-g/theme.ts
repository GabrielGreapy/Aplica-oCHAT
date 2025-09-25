import { createTheme } from '@mui/material/styles';

// Cores base que correspondem às suas variáveis CSS
const lightPalette = {
  text: {
    primary: '#112105',
  },
  background: {
    default: '#f9fef6',
    paper: '#f9fef6', // Use a mesma cor de fundo para componentes como Card
  },
  primary: {
    main: '#6fdc26',
  },
  secondary: {
    main: '#7eea9f',
  },
  accent: { // O MUI não tem "accent", então vamos adicioná-la como uma cor customizada
    main: '#5fe5a2',
  },
};

const darkPalette = {
  text: {
    primary: '#ebfae0',
  },
  background: {
    default: '#040901',
    paper: '#040901',
  },
  primary: {
    main: '#6bd723',
  },
  secondary: {
    main: '#157f35',
  },
  accent: {
    main: '#1a9e5c',
  },
};

// Crie os temas do Material UI
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...lightPalette,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...darkPalette,
  },
});