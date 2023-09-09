import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../common/navbar";
import { Sidebar } from "../common/sidebar";
import { Login } from "../screens/login";

export const AuthenticatedRoute = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);
  const authenticated = localStorage.getItem("token");
  if (!authenticated) {
    return <Login />;
  } else {
    return (
      <>
        <Navbar toggleMenu={toggleMenu} />
        <Sidebar open={open} toggleMenu={toggleMenu} />
        <Outlet />
      </>
    );
  }
};
