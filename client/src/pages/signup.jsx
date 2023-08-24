import { useState } from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import { useSnackbar } from "../contexts/SnackbarContext";
import InstagramText from "../images/instagram-text.svg";
import PublicFooter from "../components/PublicFooter";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { verifyToken } = useAuth();
  const { setUser } = useUserContext();
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/signup`,
        formData
      );
      const user = response.data;

      localStorage.setItem("user-token", JSON.stringify(user.token));

      setUser(user);

      verifyToken();

      showSnackbar("Sign up successful");

      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
      showSnackbar("Error signing up: " + error.response.data.message, "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          width: "100%",
        }}
      >
        <Box sx={{ maxWidth: 400 }}>
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
            <Typography variant="h6" textAlign="center" color="#737373">
              Sign up to see photos and videos from your friends.
            </Typography>
            <TextField
              label="Mobile number or Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              label="Full name"
              variant="outlined"
              fullWidth
              name="fullname"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              name="username"
              value={formData.username}
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
              onClick={handleSignup}
            >
              Sign up
            </Button>
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
              Already have an account?
              <Link
                sx={{
                  marginLeft: "0.5rem",
                  textDecoration: "none",
                  color: "#499EF6",
                }}
                href="/login"
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      <PublicFooter />
    </Box>
  );
};

export default Login;
