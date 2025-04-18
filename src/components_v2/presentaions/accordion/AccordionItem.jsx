import React from "react";
import styled from "styled-components";

const AccordionTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const AccordionBody = styled.div`
  margin: 1rem;
`

const Box = styled.div`
  background-color: #F8F8F8;
  padding: 1rem;
  width: 50vw;
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  cursor: pointer;
`;

const AccordionItem = ({ content, onClick, selectedItems }) => {
  const handleClickTitle = () => {
    onClick(content.id)
  }

  return (
    <Box>
      <AccordionTitle onClick={handleClickTitle}>{content.question} ▼</AccordionTitle>
      {selectedItems.find((itemId) => content.id === itemId) !== undefined  && <AccordionBody>{content.answer}</AccordionBody>}
    </Box>
  );
};

export default AccordionItem;
