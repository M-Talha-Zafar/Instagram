import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import HomeImage from "../images/instagram-home.png";
import InstagramText from "../images/instagram-text.svg";
import PublicFooter from "../components/utilities/PublicFooter";
import { useAuth } from "../contexts/AuthContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Username or Email is required"),
  password: Yup.string().required("Password is required"),
});

const errorStyles = {
  fontSize: "12px",
  color: "red",
  marginBottom: "0.5rem",
};

const Login = () => {
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar();

  const [loggingIn, setLoggingIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      setLoggingIn(true);
      await login(values);
      navigate("/");
      showSnackbar("Login successful");
    } catch (ex) {
      console.error(ex);
      showSnackbar("Error signing up: " + ex.response.data.message, "error");
    } finally {
      setLoggingIn(false);
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
              <Box sx={{ width: "20vw" }}>
                <Formik
                  initialValues={{
                    usernameOrEmail: "",
                    password: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
                >
                  <Form>
                    <ErrorMessage
                      name="usernameOrEmail"
                      style={errorStyles}
                      component="div"
                    />
                    <Field
                      as={TextField}
                      label="Username or Email"
                      variant="outlined"
                      fullWidth
                      name="usernameOrEmail"
                      sx={{ marginBottom: "2rem" }}
                    />
                    <ErrorMessage
                      name="password"
                      style={errorStyles}
                      component="div"
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
                    {loggingIn ? (
                      <Box display="flex" justifyContent="center">
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Login
                      </Button>
                    )}
                  </Form>
                </Formik>
              </Box>
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
                Don&apos;t have an account?
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
