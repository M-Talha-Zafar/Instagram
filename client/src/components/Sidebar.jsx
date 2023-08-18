import React from "react";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import InstagramText from "../images/instagram-text.svg";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link, useNavigate } from "react-router-dom";

const StyledIconButton = styled(IconButton)({
  marginBottom: "20px",
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  borderRadius: "0",
  color: "black",
});

const Sidebar = () => {
  const navigate = useNavigate();
  const isXsOrSm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: { xs: "100px", sm: "100px", md: "100%" },
        maxWidth: 220,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
        padding: "20px",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "center", md: "flex-start" },
          height: "5vh",
          mb: 4,
        }}
      >
        <Link to="/">
          {isXsOrSm ? (
            <InstagramIcon fontSize="large" sx={{ color: "black" }} />
          ) : (
            <img
              src={InstagramText}
              alt="Instagram"
              style={{ width: "150px" }}
            />
          )}
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <StyledIconButton onClick={() => navigate("/")}>
          <HomeIcon fontSize="large" />
          <Typography
            ml={2}
            display={{ xs: "none", sm: "none", md: "block" }}
            variant="subtitle1"
          >
            Home
          </Typography>
        </StyledIconButton>
        <StyledIconButton onClick={() => navigate("/search")}>
          <SearchIcon fontSize="large" />
          <Typography
            ml={2}
            display={{ xs: "none", sm: "none", md: "block" }}
            variant="subtitle1"
          >
            Search
          </Typography>
        </StyledIconButton>
        <StyledIconButton onClick={() => navigate("/user")}>
          <PersonIcon fontSize="large" />
          <Typography
            ml={2}
            display={{ xs: "none", sm: "none", md: "block" }}
            variant="subtitle1"
          >
            Profile
          </Typography>
        </StyledIconButton>
      </Box>
    </Box>
  );
};

export default Sidebar;
