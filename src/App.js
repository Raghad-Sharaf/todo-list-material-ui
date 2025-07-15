import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    background: {
      default: "hsl(0, 0%, 100%)",
      paper: "hsl(0, 0%, 98%)",
    },

    primary: {
      main: "rgb(90, 103, 216)",
    },

    secondary: {
      main: "rgb(74, 85, 104)",
    },

    text: {
      primary: "rgb(26, 32, 44)",
      secondary: "rgb(113, 128, 150)",
    },

    error: {
      main: "hsl(0, 84.2%, 60.2%)",
    },
    success: {
      main: "rgb(46, 125, 50)",
    },
  },

  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="App">
          <TodoList />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
