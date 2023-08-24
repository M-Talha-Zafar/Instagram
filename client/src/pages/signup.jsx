import { useState } from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import { useSnackbar } from "../contexts/SnackbarContext";
import InstagramText from "../images/instagram-text.svg";
import PublicFooter from "../components/PublicFooter";
import { useUserContext } from "../contexts/UserContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  fullname: Yup.string().required("Full name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const errorStyles = {
  fontSize: "12px",
  color: "red",
  marginBottom: "0.5rem",
};

const Signup = () => {
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

  const handleSignup = async (values) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/signup`,
        values
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
            <img
              src={InstagramText}
              alt=""
              style={{ width: "150px", marginBottom: "2rem" }}
            />
            <Typography variant="h6" textAlign="center" color="#737373">
              Sign up to see photos and videos from your friends.
            </Typography>
            <Formik
              initialValues={{
                email: "",
                fullname: "",
                username: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              <Form sx={{ gap: "2rem" }}>
                <ErrorMessage
                  name="email"
                  component="div"
                  style={errorStyles}
                />
                <Field
                  as={TextField}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  sx={{ marginBottom: "2rem" }}
                />
                <ErrorMessage
                  name="fullname"
                  component="div"
                  style={errorStyles}
                />
                <Field
                  as={TextField}
                  label="Full name"
                  variant="outlined"
                  fullWidth
                  name="fullname"
                  sx={{ marginBottom: "2rem" }}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  style={errorStyles}
                />
                <Field
                  as={TextField}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  name="username"
                  sx={{ marginBottom: "2rem" }}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={errorStyles}
                />
                <Field
                  as={TextField}
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  name="password"
                  sx={{ marginBottom: "2rem" }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Sign up
                </Button>
              </Form>
            </Formik>
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

export default Signup;
