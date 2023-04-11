import { Poppins } from "next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ptBR } from "@mui/x-date-pickers/locales";
import { ptBR as dataGridPtBR } from "@mui/x-data-grid";
import { ptBR as corePtBR } from "@mui/material/locale";

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "auto",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const theme = responsiveFontSizes(
  createTheme(
    {
      typography: {
        fontFamily: poppins.style.fontFamily,
      },
      components: {
        MuiAlert: {
          styleOverrides: {
            root: {
              borderRadius: "15px",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: "15px",
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              borderTopLeftRadius: "unset",
              borderTopRightRadius: "unset",
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            root: {
              borderTopLeftRadius: "unset",
              borderBottomRightRadius: "unset",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
              borderRadius: "30px",
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: "20px",
            },
          },
        },
        MuiFilledInput: {
          styleOverrides: {
            root: {
              borderRadius: "15px",
              ":before": {
                border: "none !important",
              },
              ":after": {
                border: "none !important",
              },
              ":hover:before": {
                border: "none !important",
              },
            },
          },
        },
        MuiContainer: {
          styleOverrides: {
            root: {
              height: "100%",
              display: "flex",
            },
          },
        },
      },
    },
    ptBR,
    dataGridPtBR,
    corePtBR
  )
);

export default theme;
