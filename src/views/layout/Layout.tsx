import Navigation, { NAVIGATION_HEIGHT } from "./navigation/Navigation";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Navigation />

      <Stack
        sx={{
          minHeight: `calc(100vh - ${NAVIGATION_HEIGHT})`,
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "common.white",
          overflowY: "auto",
          py: { xs: "45px", sm: "initial" },
        }}
      >
        <Outlet />
      </Stack>
    </>
  );
};

export default Layout;
