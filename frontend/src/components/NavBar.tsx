import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography
            variant="h6"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Blog Management
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/create")}>
            Create
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
