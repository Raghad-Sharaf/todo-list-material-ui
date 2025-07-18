import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { Box } from "@mui/material";

// Components
import { tasksContext } from "../contexts/tasksContext";

// Others
import { useContext, useState } from "react";

export default function Task({ task }) {
  const { tasks, setTasks } = useContext(tasksContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Event Handlers
  function handleCheckedButton() {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });

    setTasks(updatedTasks);
  }

  function handleDeleteDialog() {
    setShowDeleteDialog(true);
  }

  function handleClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    const updatedTasks = tasks.filter((t) => {
      return t.id !== task.id;
    });

    setTasks(updatedTasks);
  }

  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleClose}
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
          {task && (
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
                "{task.title}"
              </Typography>
            </Box>
          )}
          <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleClose}
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
      <Card
        className="task"
        sx={{
          minWidth: 275,
          borderRadius: 3,
          border: "none",
          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
          backgroundColor: "background.default",
          mb: 2,
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
                sx={{ color: "secondary.main", mb: 1, textAlign: "left" }}
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
              <IconButton className="action-btn" sx={{ color: "primary.main" }}>
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
