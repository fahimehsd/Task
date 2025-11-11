"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light"
  },
  typography: {
    fontFamily: "var(--font-vazir), sans-serif"
  }
});

export default theme;
