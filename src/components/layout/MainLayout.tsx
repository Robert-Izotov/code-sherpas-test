import React from "react";
import { Box } from "@mui/material";
import Navbar from "./Navbar";

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box sx={{ px: { xs: 3, md: 5 }, pt: 4 }}>{children}</Box>
    </>
  );
};

export default MainLayout;
