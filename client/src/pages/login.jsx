import { Box, Typography, TextField, Button, Link } from "@mui/material";
import HomeImage from "../images/instagram-home.png";
import InstagramText from "../images/instagram-text.svg";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
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
        <img src={HomeImage} alt="home-image" style={{ height: "100%" }}></img>
        <Box sx={{ width: "20vw" }}>
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
            <TextField label="Username or Email" variant="outlined" fullWidth />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
            />
            <Button variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <Typography>
              <Link
                sx={{
                  textDecoration: "none",
                  color: "#499EF6",
                }}
                href="#"
                color="inherit"
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
                href="#"
                color="inherit"
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
