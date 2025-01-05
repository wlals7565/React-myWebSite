import styled from "styled-components";
import { Link } from "react-router";

export const Input = styled.input`
  background: none;
  border: 1px solid #777;
  border-radius: 3px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 20px;
  color: #fff;
`;

export const Header = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 20px;
  color: white;
`;

export const BlueButton = styled.button`
  display: inline-block;
  background-color: #378ad3;
  color: #fff;
  border: 0;
  border-radius: 5px;
  padding: 10px 10px;
`;

export const BlueButtonLink = styled(Link)`
  display: inline-block;
  background-color: #378ad3;
  color: #fff;
  border: 0;
  border-radius: 5px;
  padding: 10px 10px;
`;
