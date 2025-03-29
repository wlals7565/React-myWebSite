import styled from 'styled-components';

const AccordionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const AccordionDetails = styled.details`
  margin-left: 20vw;
  margin-right: 20vw;
  margin-top: 10vh;
  border-radius: 20px;
  border: 1px solid black;
  padding: 1rem;
  background-color: transparent;

  &:hover {
    background-color: #F0F0F0;
  }

  &:active {
    background-color: #E4E4E4;
  }
`

const AccordionPhase = styled.p`
  margin-top: 1rem;
`

const AccordionSummary = styled.summary`
  cursor: pointer;
`

const contents = [
  {
    id: 1,
    question: "아코디언 컴퍼넌트란 무엇인가요?",
    answer:
      "아코디언 컴퍼넌트는 사용자가 클릭하거나 상호작용할 수 있는 요소를 통해 콘텐츠를 확장하거나 축소할 수 있는 UI 컴포넌트입니다. 주로 ‘details’와 ‘summary’ HTML 태그를 사용해 구현하며, 사용자가 여러 항목을 한눈에 보기 쉽게 만들 수 있습니다.",
  },
  {
    id: 2,
    question: "아코디언은 어디에서 사용되나요?",
    answer:
      "아코디언은 FAQ 페이지, 메뉴 바, 설정 옵션, 또는 길이가 긴 콘텐츠를 간단히 숨기거나 펼치는 방식으로 사용됩니다. 사용자가 한 번에 많은 정보에 접근할 수 있도록 도와주며, 인터페이스를 깔끔하게 유지하는 데 유용합니다.",
  },
  {
    id: 3,
    question: "음악 기구로써 아코디언은 무엇인가요?",
    answer:
      "음악 기구로서의 아코디언은 공기 흐름을 이용해 음을 내는 관악기입니다. 주로 버튼이나 건반을 통해 멜로디와 화음을 연주하며, 두 개의 판 사이에서 공기를 주입하거나 배출하는 방식으로 소리를 만듭니다. 이 악기는 다양한 장르에서 사용되며, 특히 유럽의 전통 음악에서 많이 사용됩니다.",
  },
];

const Accordion = () => {
  return (
    <AccordionBox>
      {contents.map((content) => (
        <AccordionDetails key={content.id}>
          <AccordionSummary>{content.question}</AccordionSummary>
          <AccordionPhase>{content.answer}</AccordionPhase>
        </AccordionDetails>
      ))}
    </AccordionBox>
  );
};

export default Accordion;
