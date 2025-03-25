import Header from "./Header";
import { Outlet } from "react-router";
import styled from "styled-components";
import Footer from "./Footer";
import PropTypes from "prop-types";

const BodyBox = styled.div`
  padding-left: 15vw;
  padding-right: 15vw;
`;

const Layout = ({layout}) => {
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
