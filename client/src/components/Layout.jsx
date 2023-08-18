import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Sidebar />
      {children}
    </Box>
  );
};

export default Layout;
