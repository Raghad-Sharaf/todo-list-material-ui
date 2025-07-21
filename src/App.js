import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { tasksContext } from "./contexts/tasksContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialTasks = [
  {
    id: uuidv4(),
    title: "task #1",
    details:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "task #2",
    details:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "task #3",
    details:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    isCompleted: false,
  },
];

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
  const [tasks, setTasks] = useState(initialTasks);
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="App">
          <tasksContext.Provider value={{ tasks, setTasks }}>
            <TodoList />
          </tasksContext.Provider>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
