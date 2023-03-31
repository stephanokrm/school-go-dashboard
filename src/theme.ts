import {Cabin} from 'next/font/google';
import {createTheme} from '@mui/material/styles';

export const cabin = Cabin({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
    typography: {
        fontFamily: cabin.style.fontFamily,
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: '15px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '15px',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderTopLeftRadius: 'unset',
                    borderTopRightRadius: 'unset',
                }
            },
        },
        MuiDrawer: {
            styleOverrides: {
                root: {
                    borderTopLeftRadius: 'unset',
                    borderBottomRightRadius: 'unset',
                }
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '30px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    borderRadius: '15px',
                    ':before': {
                        border: 'none !important',
                    },
                    ':after': {
                        border: 'none !important',
                    },
                    ':hover:before': {
                        border: 'none !important',
                    },
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    height: '100%',
                    display: 'flex',
                },
            },
        },
    },
});

export default theme;
