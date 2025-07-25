import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

// Components
import { tasksContext } from "../contexts/tasksContext";
import { useToast } from "../contexts/ToastContext";

// Others
import { useContext } from "react";

export default function Task({ task, showDelete, showUpdate }) {
  const { tasks, setTasks } = useContext(tasksContext);
  const { showHideToast } = useToast();

  // Event Handlers
  function handleCheckedButton() {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    showHideToast("Task updated successfully!");
  }

  function handleDeleteDialog() {
    showDelete(task);
  }

  function handleUpdateDialog() {
    showUpdate(task);
  }

  return (
    <>
      <Card
        className="task"
        sx={{
          minWidth: 275,
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
          backgroundColor: "background.default",
          mb: 2,
          background: task.isCompleted
            ? "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(21, 128, 61, 0.1) 100%)"
            : "background.default",
          border: task.isCompleted
            ? "solid 1px rgba(34, 197, 94, 0.2)"
            : "solid 1px rgba(102, 126, 234, 0.1)",
        }}
      >
        <CardContent sx={{ padding: "16px 16px 16px 24px!important" }}>
          <Grid container spacing={2}>
            <Grid
              size={8}
              display="flex"
              justifyContent="center"
              flexDirection="column"
            >
              <Typography
                variant="body1"
                sx={{
                  color: "secondary.main",
                  mb: 1,
                  textAlign: "left",
                  textDecoration: task.isCompleted ? "line-through" : "none",
                  opacity: task.isCompleted ? 0.7 : 1,
                }}
              >
                {task.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  textAlign: "left",
                  fontSize: "0.75rem",
                  fontFamily:
                    'Inter, "SF Pro Display", Roboto, Helvetica, Arial, sans-serif',
                }}
              >
                {task.details}
              </Typography>
            </Grid>
            {/* Action Buttons */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                onClick={() => {
                  handleCheckedButton();
                }}
                className="action-btn"
                sx={{
                  color: task.isCompleted ? "white" : "success.main",
                  backgroundColor: task.isCompleted ? "success.main" : "white",
                }}
              >
                <CheckRoundedIcon />
              </IconButton>
              <IconButton
                onClick={handleUpdateDialog}
                className="action-btn"
                sx={{ color: "primary.main" }}
              >
                <EditRoundedIcon />
              </IconButton>
              <IconButton
                onClick={handleDeleteDialog}
                className="action-btn"
                aria-label="delete"
                sx={{ color: "error.main" }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
