import * as React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function SnackBar({ open, message }) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            minWidth: "300px",
          },
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            borderRadius: 3,
            fontWeight: 500,
            fontSize: "0.95rem",
            width: "100%",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease-in-out",
            paddingY: 1,
            paddingX: 3,

            "&.MuiAlert-filledSuccess": {
              background: "success.main",
              color: "#ffffff",
            },

            "& .MuiAlert-icon": {
              fontSize: "1.5rem",
              color: "#ffffff",
            },

            "& .MuiAlert-message": {
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
            },
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
