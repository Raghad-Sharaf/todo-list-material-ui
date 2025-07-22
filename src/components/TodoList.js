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
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Components
import Task from "./Task";
import { tasksContext } from "../contexts/tasksContext";

// Others
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect, useMemo } from "react";

export default function TodoList() {
  const { tasks, setTasks } = useContext(tasksContext);
  const [displayedTasksType, setDisplayedTasksType] = useState("all");
  const [taskInput, setTaskInput] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [dialogTask, setDialogTask] = useState(null);

  // Filtration arrays
  const completedTasks = useMemo(() => {
    return tasks.filter((t) => {
      return t.isCompleted;
    });
  }, [tasks]);

  const inCompleteTasks = useMemo(() => {
    return tasks.filter((t) => {
      return !t.isCompleted;
    });
  }, [tasks]);

  let tasksToBeRendered = tasks;
  if (displayedTasksType === "complete") {
    tasksToBeRendered = completedTasks;
  } else if (displayedTasksType === "in-complete") {
    tasksToBeRendered = inCompleteTasks;
  } else {
    tasksToBeRendered = tasks;
  }

  const tasksList = tasksToBeRendered.map((task) => {
    return (
      <Task
        key={task.id}
        task={task}
        showDelete={displayDeleteDialog}
        showUpdate={displayUpdateDialog}
      />
    );
  });

  // Get tasks from local storage when component is loaded for the first time
  useEffect(() => {
    const storageTasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(storageTasks || []);
  }, [setTasks]);

  // Event Handlers
  function changeTasksDisplayedType(e) {
    setDisplayedTasksType(e.target.value);
  }

  function handleAddTask() {
    const newTask = {
      id: uuidv4(),
      title: taskInput.trim(),
      details: "",
      isCompleted: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Clear text field after addition
    setTaskInput("");
  }

  function displayDeleteDialog(task) {
    setDialogTask(task);
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    const updatedTasks = tasks.filter((t) => {
      return t.id !== dialogTask.id;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowDeleteDialog(false);
  }

  function displayUpdateDialog(task) {
    setDialogTask(task);
    setShowUpdateDialog(true);
  }

  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    const updatedTasks = tasks.map((t) => {
      if (t.id === dialogTask.id) {
        return { ...t, title: dialogTask.title, details: dialogTask.details };
      } else {
        return t;
      }
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Close update dialog after confirmation
    setShowUpdateDialog(false);
  }

  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 5,
              background: "background.paper",
              backdropFilter: "blur(20px)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            },
          },
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          },
        }}
      >
        <DialogTitle
          variant="h5"
          id="alert-dialog-title"
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "error.main",
            display: "flex",
            alignItems: "center",
            gap: 1,
            pt: 3,
          }}
        >
          <WarningRoundedIcon sx={{ fontSize: 32, color: "error.main" }} />
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ mb: 2, color: "secondary.main" }}
          >
            Are you sure you want to delete this task?
          </DialogContentText>
          {dialogTask && (
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontStyle: "italic",
                  color: "text.secondary",
                }}
              >
                "{dialogTask.title}"
              </Typography>
            </Box>
          )}
          <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleDeleteDialogClose}
            variant="outlined"
            sx={{
              borderRadius: 3,
              px: 3,
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            autoFocus
            variant="contained"
            sx={{
              borderRadius: 3,
              px: 3,
              fontWeight: 500,
              textTransform: "none",
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* === Delete Dialog === */}
      {/* Update Dialog */}
      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 5,
              background: "background.paper",
              backdropFilter: "blur(20px)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            },
          },
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          },
        }}
      >
        <DialogTitle
          variant="h5"
          id="alert-dialog-title"
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            gap: 1,
            pt: 3,
          }}
        >
          Edit Task
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25em",
              color: "secondary.main",
            }}
          >
            <TextField
              value={dialogTask?.title || ""}
              onChange={(e) => {
                setDialogTask({ ...dialogTask, title: e.target.value });
              }}
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Edit Title"
              type="text"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
                borderColor: "primary.main",
              }}
            />
            <TextField
              value={dialogTask?.details || ""}
              onChange={(e) => {
                setDialogTask({ ...dialogTask, details: e.target.value });
              }}
              autoFocus
              margin="dense"
              id="details"
              name="details"
              label="Edit Details"
              type="text"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
                borderColor: "primary.main",
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleUpdateDialogClose}
            variant="outlined"
            sx={{
              borderRadius: 3,
              px: 3,
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateConfirm}
            autoFocus
            variant="contained"
            sx={{
              borderRadius: 3,
              px: 3,
              fontWeight: 500,
              textTransform: "none",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
              },
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* === Update Dialog === */}
      <Container maxWidth="sm" sx={{ padding: 3, margin: 0 }}>
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
          <CardContent
            sx={{
              padding: 3,
              backgroundColor: "background.paper",
              maxHeight: "80vh",
              overflowY: "scroll",
            }}
          >
            {/* Toggle Buttons */}
            <ToggleButtonGroup
              value={displayedTasksType}
              exclusive
              onChange={changeTasksDisplayedType}
              aria-label="text filter"
              sx={{
                mb: 3,
                gap: 2,
                "& .MuiToggleButtonGroup-grouped": {
                  borderRadius: "30px !important",
                  margin: 0,
                  border: "2px solid rgba(102, 126, 234, 0.3)",
                  transition: "all 0.2s ease-in-out",
                },
                "& .MuiToggleButton-root:not(.Mui-selected):hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px",
                  background: "rgba(102, 126, 234, 0.1)",
                },
              }}
            >
              <ToggleButton
                value="all"
                aria-label="left aligned"
                sx={{
                  color: "text.primary",
                  fontSize: "0.9rem",
                  textTransform: "initial",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "2px solid rgba(102, 126, 234, 0.3)",
                  padding: "8px 30px",
                  height: "32px",
                }}
              >
                All
              </ToggleButton>
              <ToggleButton
                value="complete"
                aria-label="centered"
                sx={{
                  color: "text.primary",
                  fontSize: "0.9rem",
                  textTransform: "initial",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "2px solid rgba(102, 126, 234, 0.3)",
                  padding: "8px 30px",
                  height: "32px",
                }}
              >
                Done
              </ToggleButton>
              <ToggleButton
                value="in-complete"
                aria-label="right aligned"
                sx={{
                  color: "text.primary",
                  fontSize: "0.9rem",
                  textTransform: "initial",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "2px solid rgba(102, 126, 234, 0.3)",
                  padding: "8px 30px",
                  height: "32px",
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
                  onChange={(e) => {
                    setTaskInput(e.target.value);
                  }}
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
                  onClick={() => {
                    handleAddTask();
                  }}
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
                  disabled={taskInput.trim().length === 0}
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
