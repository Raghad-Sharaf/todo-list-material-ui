import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Components
import Task from "./Task";

// Others
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

const initialTasks = [
  {
    id: uuidv4(),
    title: 'task #1',
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    isCompleted: false
  },
   {
    id: uuidv4(),
    title: 'task #2',
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    isCompleted: false
  },
   {
    id: uuidv4(),
    title: 'task #3',
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    isCompleted: false
  }
]

export default function TodoList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskInput, setTaskInput] = useState("");
  
  const tasksList = tasks.map((task) => {
    return <Task key={task.id} title={task.title} details={task.details} />
  })

  function handleAddTask () {
    const newTask = {
      id: uuidv4(),
      title: taskInput,
      details: "",
      isCompleted: false
    }

    setTasks([...tasks, newTask]);

    // Clear text field after addition
    setTaskInput("")
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ padding: 3 }}>
        <Card sx={{ minWidth: 275, borderRadius: 5 }}>
          <CardContent
            sx={{
              background:
                "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
              padding: 4,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "secondary.main",
                mb: 1,
                textAlign: "left",
                fontSize: "1.8rem",
                letterSpacing: "-0.02em",
              }}
            >
              My To-do List
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                color: "text.secondary",
                mb: 3,
                textAlign: "left",
                fontSize: "0.9rem",
                fontWeight: "400",
                letterSpacing: "-0.02em",
              }}
            >
              Sun, July 13th, 2025
            </Typography>

            {/* All Tasks */}
            <Box
              sx={{
                display: "flex",
                gap: 4,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: "text.primary",
                    fontWeight: 400,
                    fontSize: "2rem",
                    lineHeight: 1,
                  }}
                >
                  0
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    textAlign: "left",
                    fontWeight: "400",
                  }}
                >
                  Total Tasks
                </Typography>
              </Box>

              {/* Completed Tasks */}
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: "text.primary",
                    fontWeight: 400,
                    fontSize: "2rem",
                    lineHeight: 1,
                  }}
                >
                  0
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontWeight: "400",
                  }}
                >
                  Completed
                </Typography>
              </Box>

              {/* Progress Circle */}
              <Box sx={{ flex: 1, ml: 2, minWidth: 120 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 55,
                      height: 55,
                      borderRadius: "50%",
                      border: "3px solid rgba(102, 126, 234, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {/* Progress Ring */}
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        background: `conic-gradient(
                  from 0deg, 
                  #667eea 0deg, 
                  #667eea 90deg, 
                  rgba(102, 126, 234, 0.2) 180deg, 
                  rgba(102, 126, 234, 0.2) 360deg
                )`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* Inner White Circle */}
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          backgroundColor: "background.default",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.primary",
                            fontWeight: 600,
                            fontSize: "0.8rem",
                          }}
                        >
                          50%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "secondary.main",
                      fontSize: "0.85rem",
                      fontWeight: "400",
                    }}
                  >
                    50% done
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
          <CardContent sx={{ padding: 3, backgroundColor: "background.paper" }}>
            {/* Toggle Buttons */}
            <ToggleButtonGroup
              // value={alignment}
              exclusive
              // onChange={handleAlignment}
              aria-label="text alignment"
              sx={{ mb: 3 }}
            >
              <ToggleButton
                value="left"
                aria-label="left aligned"
                sx={{
                  color: "text.primary",
                  fontSize: "0.9rem",
                  textTransform: "initial",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "2px solid rgba(102, 126, 234, 0.3)",
                }}
              >
                All
              </ToggleButton>
              <ToggleButton
                value="center"
                aria-label="centered"
                sx={{
                  color: "text.primary",
                  fontSize: "0.9rem",
                  textTransform: "initial",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "2px solid rgba(102, 126, 234, 0.3)",
                }}
              >
                Done
              </ToggleButton>
              <ToggleButton
                value="right"
                aria-label="right aligned"
                sx={{
                  color: "text.primary",
                  fontSize: "0.9rem",
                  textTransform: "initial",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "2px solid rgba(102, 126, 234, 0.3)",
                }}
              >
                Not Done Yet
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Tasks */}
            {tasksList}

            {/* Input + Add Task Button */}
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid
                size={8}
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <TextField
                  value={taskInput}
                  onChange={(e) => {setTaskInput(e.target.value)}}
                  id="outlined-basic"
                  label="What needs to be done?"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                />
              </Grid>
              <Grid
                size={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  onClick={() => {handleAddTask()}}
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "primary.main",
                    borderRadius: 3,
                    fontSize: "1.10rem",
                    textTransform: "initial",
                    fontFamily:
                      'Inter, "SF Pro Display", Roboto, Helvetica, Arial, sans-serif',
                  }}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
