import { useContext, useEffect } from "react";
import Header from "./layout/Header";
import { Outlet } from "react-router";
import { checkAuthStatus } from "../../api/auth";
import UserContext from "../../contexts/UserContext";
import styled from "styled-components";
import Footer from "./layout/Footer";

const BodyBox = styled.div`
  padding-left: 22.5rem;
  padding-right: 22.25rem;
`;

const Layout = () => {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    checkAuthStatus(setUser);
  }, [setUser]);
  return (
    <>
      <Header />
      <BodyBox style={{padding: 0}}>
        <Outlet />
      </BodyBox>
      <Footer />
    </>
  );
};

export default Layout;
