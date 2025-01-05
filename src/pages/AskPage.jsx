import styled from "styled-components";
import BlueButton from "../components/BlueButton";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCallback, useState } from "react";
import { Input } from "../components/StyledComponents";
import { createPost } from "../api/post";
import { useNavigate } from "react-router";
import { ReactTags } from "react-tag-autocomplete";
import suggestions from "../suggestions";



const Container = styled.div`
  padding: 30px 20px;
`;

const QuestionBodyTextarea = styled.textarea`
  background: none;
  border: 1px solid #777;
  border-radius: 3px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  min-height: 200px;
  margin-bottom: 20px;
  color: #fff;
  font-family: inherit;
`;

const StyledHeader = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 20px;
  color: white;
`;

const PreviewArea = styled.div`
  padding: 20px;
  background-color: #444;
  border-radius: 5px;
  margin-bottom: 20px;

  h1 {
    font-size: 2.5rem; /* 기본 크기 */
    font-weight: bold; /* 기본 두께 */
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h1 */
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h2 */
  }

  h3 {
    font-size: 1.75rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h3 */
  }

  h4 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h4 */
  }

  h5 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h5 */
  }

  h6 {
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    /* Log: Applied styles for h6 */
  }

  p {
    font-size: 1rem; /* 기본 문단 크기 */
    color: #ccc;
    line-height: 1.5;
    margin-bottom: 10px;
    /* Log: Applied styles for p */
  }

  ul,
  ol {
    font-size: 1rem;
    padding-left: 20px;
    color: #ccc;
    margin-bottom: 10px; /* 목록 하단 여백 */
    /* Log: Applied styles for ul, ol */
  }

  code {
    font-family: monospace; /* 코드에 적합한 폰트 */
    background-color: #333;
    color: #0f0;
    padding: 2px 4px;
    border-radius: 3px;
    /* Log: Applied styles for code */
  }

  blockquote {
    border-left: 3px solid #777;
    padding-left: 10px;
    color: #aaa;
    margin-bottom: 10px;
    font-style: italic;
    font-size: 1rem; /* 기본 크기 */
    /* Log: Applied styles for blockquote */
  }

  table {
    width: 100%;
    border-collapse: collapse;
    color: #fff;
    margin-bottom: 10px; /* 테이블 하단 여백 */
    /* Log: Applied styles for table */
  }

  th,
  td {
    border: 1px solid #777;
    padding: 5px 10px;
    font-size: 1rem; /* 기본 텍스트 크기 */
    /* Log: Applied styles for th, td */
  }

  th {
    background-color: #555;
    font-weight: bold; /* 테이블 헤더 강조 */
    /* Log: Applied styles for th */
  }
`;

const StyledDiv = styled.div`
  margin: 20px 0px;
  
  .react-tags {
  position: relative;
  padding: 0.25rem 0 0 0.25rem;
  border: 1px solid #777;
  border-radius: 6px;
  background: none;
  /* shared font styles */
  font-size: 1rem;
  line-height: 1.2;
  /* clicking anywhere will focus the input */
  cursor: text;
}

.react-tags.is-active {
  border-color: #378ad3;
}

.react-tags.is-disabled {
  opacity: 0.75;
  background-color: #eaeef2;
  /* Prevent any clicking on the component */
  pointer-events: none;
  cursor: not-allowed;
}

.react-tags.is-invalid {
  border-color: #fd5956;
  box-shadow: 0 0 0 2px rgba(253, 86, 83, 0.25);
}

.react-tags__label {
  display: none;
}

.react-tags__list {
  /* Do not use display: contents, it's too buggy */
  display: inline;
  padding: 0;
}

.react-tags__list-item {
  display: inline;
  list-style: none;
}

.react-tags__tag {
  margin: 0 0.25rem 0.25rem 0;
  padding: 0.375rem 0.5rem;
  border: 0;
  border-radius: 3px;
  background: #eaeef2;
  /* match the font styles */
  font-size: inherit;
  line-height: inherit;
}

.react-tags__tag:hover {
  color: #ffffff;
  background-color: #4f46e5;
}

.react-tags__tag::after {
  content: '';
  display: inline-block;
  width: 0.65rem;
  height: 0.65rem;
  clip-path: polygon(
    10% 0,
    0 10%,
    40% 50%,
    0 90%,
    10% 100%,
    50% 60%,
    90% 100%,
    100% 90%,
    60% 50%,
    100% 10%,
    90% 0,
    50% 40%
  );
  margin-left: 0.5rem;
  font-size: 0.875rem;
  background-color: #7c7d86;
}

.react-tags__tag:hover::after {
  background-color: #ffffff;
}

.react-tags__combobox {
  display: inline-block;
  /* match tag layout */
  padding: 0.375rem 0.25rem;
  margin-bottom: 0.25rem;
  /* prevents autoresize overflowing the container */
  max-width: 100%;
}

.react-tags__combobox-input {
  /* prevent autoresize overflowing the container */
  max-width: 100%;
  /* remove styles and layout from this element */
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: none;
  /* match the font styles */
  font-size: inherit;
  line-height: inherit;
}

.react-tags__combobox-input::placeholder {
  color: #7c7d86;
  opacity: 1;
}

.react-tags__listbox {
  position: absolute;
  z-index: 1;
  top: calc(100% + 5px);
  /* Negate the border width on the container */
  left: -2px;
  right: -2px;
  max-height: 12.5rem;
  overflow-y: auto;
  background: #ffffff;
  border: 1px solid #afb8c1;
  border-radius: 6px;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0 10px 15px -4px,
    rgba(0, 0, 0, 0.05) 0 4px 6px -2px;
}

.react-tags__listbox-option {
  padding: 0.375rem 0.5rem;
}

.react-tags__listbox-option:hover {
  cursor: pointer;
  background: #eaeef2;
}

.react-tags__listbox-option:not([aria-disabled='true']).is-active {
  background: #4f46e5;
  color: #ffffff;
}

.react-tags__listbox-option[aria-disabled='true'] {
  color: #7c7d86;
  cursor: not-allowed;
  pointer-events: none;
}

.react-tags__listbox-option[aria-selected='true']::after {
  content: '✓';
  margin-left: 0.5rem;
}

.react-tags__listbox-option[aria-selected='true']:not(.is-active)::after {
  color: #4f46e5;
}

.react-tags__listbox-option-highlight {
  background-color: #ffdd00;
}

.tag-group {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 8px;
  gap: 8px;
  background-color: #00000003;
  margin: 0.25rem 0.5rem 0.5rem 0.25rem;
  justify-content: flex-start;
  border: 1px solid #e2e2e2;
  align-items: flex-start;
  border-radius: 4px;
}

.tag-group ul {
  margin: 0;
}

.tag-group > p {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.5rem;
  color: #00000080;
}
`;

const AskPage = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [selected, setSelected] = useState([]);
  const naviage = useNavigate();

  const onAdd = useCallback(
    (newTag) => {
      setSelected([...selected, newTag]);
      console.log(selected)
    },
    [selected]
  );

  const onDelete = useCallback(
    (tagIndex) => {
      setSelected(selected.filter((_, i) => i !== tagIndex));
    },
    [selected]
  );

  const handleChangeQuestionTitle = useCallback((e) => {
    setQuestionTitle(e.target.value);
  }, []);

  const handleChangeBodyTextarea = useCallback((e) => {
    setQuestionBody(e.target.value);
  }, []);

  const validateForm = () => {
    if (questionTitle == "" || questionTitle.length > 100) {
      return "제목은 1자 이상 100자 이하여야 합니다.";
    }
    if (questionBody == "" || questionBody.length > 20000) {
      return "본문은 1자 이상 20,000자 이하여야 합니다.";
    }
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    try {
      const tags = selected.map((tag) => tag.label)
      await createPost(questionTitle, questionBody, tags);
      alert("성공적으로 게시글이 올라갔습니다.");
      naviage("/");
    } catch (error) {
      console.log(error);
      alert("서버 에러가 발생하였습니다.");
    }
  };

  return (
    <Container>
      <StyledHeader>Ask a public question</StyledHeader>
      <form onSubmit={handleSubmitQuestion}>
        <Input
          type="text"
          placeholder="Title of your question"
          value={questionTitle}
          onChange={handleChangeQuestionTitle}
        />
        <QuestionBodyTextarea
          placeholder="More Info about your question. You can use markdown here."
          value={questionBody}
          onChange={handleChangeBodyTextarea}
        ></QuestionBodyTextarea>
        <PreviewArea>
          <Markdown remarkPlugins={[remarkGfm]}>{questionBody}</Markdown>
        </PreviewArea>
        <StyledDiv>
        <ReactTags
          labelText="Select countries"
          selected={selected}
          suggestions={suggestions}
          onAdd={onAdd}
          onDelete={onDelete}
          noOptionsText="No matching countries"
          allowNew={true}
        />
        </StyledDiv>
        <BlueButton type="submit">Post Question</BlueButton>
      </form>
    </Container>
  );
};

export default AskPage;
