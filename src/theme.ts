import { createMuiTheme } from "@material-ui/core/styles";

const secondaryMain = "#49367e";
const secondaryDark = "#938FA8";
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: secondaryMain,
      contrastText: "#fff",
      dark: secondaryDark,
      light: "#C9C6D7",
    },
    primary: {
      main: "#ff5b24",
      light: "#fff4ec",
      contrastText: "#fff",
      dark: "#ffb992",
    },
    background: {
      default: "#091630",
    },
    text: {
      primary: "#161225",
      secondary: "#fff",
    },
    grey: {
      "100": "#EFEEF3",
    },
    error: {
      main: "#c60000"
    }
  },
  overrides: {
    MuiBottomNavigationAction: {
      root: {
        color: secondaryDark,
        "&$selected": {
          color: secondaryMain
        }
      }
    }
  },
  typography: {
    h4: {
      fontFamily: "Vipps Display"
    },
    h5: {
      fontFamily: "Vipps Display"
    },
    allVariants: {
      fontFamily: "Vipps Text Light"
    },

  }
});

export default theme;