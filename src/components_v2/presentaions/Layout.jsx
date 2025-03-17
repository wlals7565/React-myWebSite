import { useContext, useEffect } from "react";
import Header from "./layout/Header";
import { Outlet } from "react-router";
import { checkAuthStatus } from "../../api/auth";
import UserContext from "../../contexts/UserContext";
import styled from "styled-components";
import Footer from "./layout/Footer";
import PropTypes from "prop-types";

const BodyBox = styled.div`
  padding-left: 22.5rem;
  padding-right: 22.25rem;
`;

const Layout = ({layout}) => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    checkAuthStatus(setUser);
  }, [setUser]);
  return (
    <>
        <Header />
        <BodyBox style={layout === "wide" ? { padding: 0 } : {}}>
          <Outlet />
        </BodyBox>
        <Footer />
    </>
  );
};

Layout.propTypes = {
  layout: PropTypes.string.isRequired,
}

export default Layout;
