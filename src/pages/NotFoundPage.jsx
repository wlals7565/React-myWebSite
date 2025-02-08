import React from "react";
import styled from "styled-components";
import { BlueButton } from "../components/StyledComponents";
import { WhiteButton } from "../components/StyledComponents";

const NotFoundBox = styled.div`
  margin-top: 10rem;
  color: white;
  text-align: center;

  h1 {
    font-size: 5rem;
  }

  p {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundBox>
      <h1>404 Error</h1>
      <p>{`Sorry, we couldn't find this page`}</p>
      <p>Please check URL</p>
      <BlueButton>Go Home</BlueButton>
      <WhiteButton style={{ marginLeft: "2rem" }}>Contact Us</WhiteButton>
    </NotFoundBox>
  );
};

export default NotFoundPage;
