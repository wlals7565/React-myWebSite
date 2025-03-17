import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  margin: 2rem 6rem 2rem 6rem;
  border: 1px solid #58616A;
  border-radius: 20px;
  font-size: 2rem;
  display: flex;
  align-items: center;
`;

const Search = styled.img`
  height: 2rem;
  width: 2rem;
`

const InputBar = styled.input`
  font-size: 1.5rem;
  flex: 1;
  border: none;
  margin: 0 1rem;
  outline: none;
`

const SearchBar = () => {
  return (
      <Bar><Search src="../../../svg/search.svg" /><InputBar placeholder="검색어를 입력해주세요." maxLength={20} /></Bar>
  );
};

export default SearchBar;
