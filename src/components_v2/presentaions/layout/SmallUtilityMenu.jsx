import React from "react";
import styled from "styled-components";

const HeadphoneImage = styled.img`
  height: 2rem;
`;

export const UtilityMenuBox = styled.div`

  white-space: nowrap;
  margin: 0.5rem 22.5vw 0;
  display: flex;
  justify-content: right;
  align-items: center;
  cursor: pointer;
`;

const SmallUtilityMenu = () => {
  return (
    <UtilityMenuBox>
      <HeadphoneImage src="../../../svg/headphones.svg" />
      <div>고객센터</div>
    </UtilityMenuBox>
  );
};

export default SmallUtilityMenu;
