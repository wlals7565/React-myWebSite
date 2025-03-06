import React from "react";
import QuestionsContainer from "../../components_v2/containers/QuestionsContainer";
import SearchBar from "../../components_v2/presentaions/SearchBar";

const QuestionsPage = () => {
  return (
    <>
      <SearchBar />
      <QuestionsContainer />
    </>
  );
};

export default QuestionsPage;
