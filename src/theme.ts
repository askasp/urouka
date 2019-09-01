import { createMuiTheme } from "@material-ui/core/styles";

const secondaryMain = "#49367e";
const secondaryDark = "#938FA8";
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#fff",
      contrastText: "#fff",
      dark: secondaryDark,
      light: "#C9C6D7",
    },
    primary: {
      main: "#900736",
      light: "#fff4ec",
      contrastText: "#fff",
      dark: "#ffb992",
    },
    background: {
      default: "#091630",
    },
    text: {
      primary: "#000",
      secondary: "#161225",
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