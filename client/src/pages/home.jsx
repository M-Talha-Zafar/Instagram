import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSnackbar } from "../contexts/SnackbarContext";

const Home = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      showSnackbar("Logout successful");
    } catch (ex) {
      console.error(ex);
      showSnackbar("Error signing up: " + ex.response.data.message, "error");
    }
  };

  return (
    <Box>
      <Typography variant="h2">This is the home</Typography>
      <Button variant="filled" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Home;
