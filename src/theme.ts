import { Poppins } from "next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ptBR } from "@mui/x-date-pickers/locales";
import { ptBR as dataGridPtBR } from "@mui/x-data-grid";
import { ptBR as corePtBR } from "@mui/material/locale";
import { amber } from "@mui/material/colors";

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "auto",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const theme = responsiveFontSizes(
  createTheme(
    {
      palette: {
        mode: "dark",
        primary: amber,
      },
      typography: {
        fontFamily: poppins.style.fontFamily,
      },
      components: {
        MuiAlert: {
          styleOverrides: {
            root: {
              borderRadius: "10px",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: "10px",
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
              borderRadius: "10px",
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: "10px",
            },
          },
        },
        MuiFilledInput: {
          styleOverrides: {
            root: {
              borderRadius: "10px",
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
