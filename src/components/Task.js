import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export default function Task({title, details}){
  return (
    <>
      <Card
        className="task"
        sx={{
          minWidth: 275,
          borderRadius: 3,
          border: "none",
          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
          backgroundColor: "background.default",
          mb: 2
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
                {title}
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
                {details}
              </Typography>
            </Grid>
            {/* Action Buttons */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton className="action-btn" sx={{ color: "success.main" }}>
                <CheckRoundedIcon />
              </IconButton>
              <IconButton className="action-btn" sx={{ color: "primary.main" }}>
                <EditRoundedIcon />
              </IconButton>
              <IconButton
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
