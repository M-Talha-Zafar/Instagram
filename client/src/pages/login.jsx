import { useState } from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import HomeImage from "../images/instagram-home.png";
import InstagramText from "../images/instagram-text.svg";
import PublicFooter from "../components/PublicFooter";
import { useAuth } from "../contexts/AuthContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      await login(formData);
      navigate("/");
      showSnackbar("Login successful");
    } catch (ex) {
      console.error(ex);
      showSnackbar("Error signing up: " + ex.response.data.message, "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            <img
              src={HomeImage}
              alt="home-image"
              style={{ height: "100%" }}
            ></img>
          </Box>
          <Box sx={{ minWidth: "20vw" }}>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
              gap={2}
              sx={{
                margin: "20px",
                padding: "25px",
                border: "1px solid #DBDBDB",
              }}
            >
              <img src={InstagramText} alt="" style={{ width: "150px" }} />
              <TextField
                label="Username or Email"
                variant="outlined"
                fullWidth
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleInputChange}
              />
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
              >
                Login
              </Button>
              <Typography>
                <Link
                  sx={{
                    textDecoration: "none",
                    color: "#499EF6",
                  }}
                  href="#"
                >
                  Forgot Password?
                </Link>
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: "center",
                margin: "20px",
                padding: "25px",
                border: "1px solid #DBDBDB",
              }}
            >
              <Typography>
                Don't have an account?
                <Link
                  sx={{
                    marginLeft: "0.5rem",
                    textDecoration: "none",
                    color: "#499EF6",
                  }}
                  href="/signup"
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <PublicFooter />
    </Box>
  );
};

export default Login;
