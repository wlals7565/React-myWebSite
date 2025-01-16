import { useContext, useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import { checkAuthStatus } from "../api/auth";
import UserContext from "../contexts/UserContext";

const Layout = () => {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    console.log('layout mounted')
    checkAuthStatus(setUser);
  }, [setUser]);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
