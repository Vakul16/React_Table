import "./App.css";
import HomePage from "./Pages/HomePage";
import { createTheme, ThemeProvider } from "@material-ui/core";
const theme = createTheme({
  palette: {
    primary: {
      main: "#8f95a3",
    },
    secondary: {
      main: "#0da9de",
      dark: "#05688a",
    },
  },
  // typography: {
  //   // fontFamily: "Merriweather, serif",
  //   fontWeightLight: 400,
  //   fontWeightRegular: 500,
  //   fontWeightMedium: 600,
  //   fontWeightBold: 700,
  // },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <HomePage />
      </div>
    </ThemeProvider>
  );
}

export default App;

/* <ThemeProvider theme={theme}>
    <DropDown names={names} setNames={setNames} {...props} /></ThemeProvider> */
