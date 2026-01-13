import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { ToastProvider } from "./contexts/ToastContext";
import TasksProvider from "./contexts/tasksContext";

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

  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            background:
              "linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%);",
            color: "#fff",
            border: "none",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "rgba(102, 126, 234, 0.3)",
          },
        },
      },
    },
  },
});

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <TasksProvider>
          <ToastProvider>
            <div className="App">
              <TodoList />
            </div>
          </ToastProvider>
        </TasksProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
