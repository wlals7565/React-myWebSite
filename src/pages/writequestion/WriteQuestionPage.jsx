import styled from "styled-components";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import suggestions from "../../suggestions";
import { createPost, getQuestion, updatePost } from "../../api/post";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ReactTags } from "react-tag-autocomplete";
import { uploadImage } from "../../api/image";
import { useSearchParams } from "react-router";

const urlTransform = (url, key, node) => {
  return url; // URL을 그대로 반환
};

const WriteQuestionBox = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const MarkDownBox = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const MarkDownTitleInput = styled.input`
  padding: 1rem;
  border: none;
  outline: none;
  font-size: xx-large;
  font-weight: bold;
  width: 100%;
`;

const MarkDownTextarea = styled.textarea`
  border: none;
  width: 100%;
  height: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  box-sizing: border-box;
  outline: none;
  flex: 1;
  resize: none;
`;

const PreViewBox = styled.div`
  flex: 1;
  padding: 5rem 2rem;
  background-color: #f3fcf3;
  overflow-y: scroll;

  h1 {
    font-size: 2.5rem; /* 기본 크기 */
    font-weight: bold; /* 기본 두께 */
    margin-bottom: 10px;
    /* Log: Applied styles for h1 */
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
    /* Log: Applied styles for h2 */
  }

  h3 {
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 10px;
    /* Log: Applied styles for h3 */
  }

  h4 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    /* Log: Applied styles for h4 */
  }

  h5 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 10px;
    /* Log: Applied styles for h5 */
  }

  h6 {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 10px;
    /* Log: Applied styles for h6 */
  }

  p {
    font-size: 1rem; /* 기본 문단 크기 */
    line-height: 1.5;
    margin-bottom: 10px;
    /* Log: Applied styles for p */
  }

  ul,
  ol {
    font-size: 1rem;
    padding-left: 20px;
    margin-bottom: 10px; /* 목록 하단 여백 */
    /* Log: Applied styles for ul, ol */
  }

  code {
    font-family: monospace; /* 코드에 적합한 폰트 */
    background-color: #ebf5ff;
    padding: 2px 4px;
    border-radius: 3px;
    /* Log: Applied styles for code */
  }

  blockquote {
    border-left: 3px solid #777;
    padding-left: 10px;
    margin-bottom: 10px;
    font-style: italic;
    font-size: 1rem; /* 기본 크기 */
    /* Log: Applied styles for blockquote */
  }

  table {
    width: 100%;
    border-collapse: collapse;
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

const ReactTagBox = styled.div`
  margin: 20px 0px;

  .react-tags {
    position: relative;
    padding: 0.25rem 0 0 0.25rem;
    background: none;
    /* shared font styles */
    font-size: 1rem;
    line-height: 1.2;
    /* clicking anywhere will focus the input */
    cursor: text;
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
    content: "";
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
    box-shadow: rgba(0, 0, 0, 0.1) 0 10px 15px -4px,
      rgba(0, 0, 0, 0.05) 0 4px 6px -2px;
  }

  .react-tags__listbox-option {
    padding: 0.375rem 0.5rem;
  }

  .react-tags__listbox-option:hover {
    cursor: pointer;
    background: #eaeef2;
  }

  .react-tags__listbox-option:not([aria-disabled="true"]).is-active {
    background: #4f46e5;
    color: #ffffff;
  }

  .react-tags__listbox-option[aria-disabled="true"] {
    color: #7c7d86;
    cursor: not-allowed;
    pointer-events: none;
  }

  .react-tags__listbox-option[aria-selected="true"]::after {
    content: "✓";
    margin-left: 0.5rem;
  }

  .react-tags__listbox-option[aria-selected="true"]:not(.is-active)::after {
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

const MenuBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 1rem;
  align-items: center;
`;

const ExitButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
`;

const PostButton = styled.button`
  border-radius: 20px;
  border: none;
  background-color: #246beb;
  color: #ffffff;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: #1d56bc;
  }

  &:active {
    background-color: #16408d;
  }
`;

const WriteQuestionPage = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  // 태그 선택된 것들
  const [selected, setSelected] = useState([]);
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getQuestion(id).then(({ data }) => {
        setQuestionTitle(data.title);
        setQuestionBody(data.body);
        setSelected(data.tags.map((tag, i) => ({ value: i, label: tag })));
      });
    }
  }, []);

  // 태그 추가할 때
  const onAdd = useCallback(
    (newTag) => {
      setSelected([...selected, newTag]);
    },
    [selected]
  );

  // 나가기 버튼 눌렀을 때
  const handleClickExitButton = () => {
    navigate(-1);
  };

  // 태그에서 삭제할 떄
  const onDelete = useCallback(
    (tagIndex) => {
      setSelected(selected.filter((_, i) => i !== tagIndex));
    },
    [selected]
  );

  // 제목 바뀔때
  const handleChangeQuestionTitle = useCallback((e) => {
    setQuestionTitle(e.target.value);
  }, []);

  // 본문 바뀔때
  const handleChangeBodyTextarea = useCallback((e) => {
    setQuestionBody(e.target.value);
  }, []);

  // 게시하기 전에 유효한지 확인
  const validateForm = () => {
    if (questionTitle == "" || questionTitle.length > 100) {
      return "제목은 1자 이상 100자 이하여야 합니다.";
    }
    if (questionBody == "" || questionBody.length > 20000) {
      return "본문은 1자 이상 20,000자 이하여야 합니다.";
    }
  };

  // 본문에 사진 붙여넣을때
  const handlePaste = async (event) => {
    const items = event.clipboardData.items;
  
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        event.preventDefault();
        
        const blob = await item.getAsFile();
        const formData = new FormData();
        formData.append("file", blob);
        const blobUrl = URL.createObjectURL(blob);
  
        const cursorPos = event.target.selectionStart; // Get cursor position
        
        // 붙여 넣기 이후 Text 설정
        const textBefore = questionBody.substring(0, cursorPos);
        const textAfter = questionBody.substring(cursorPos);
        const newText = `${textBefore}![image](${blobUrl})${textAfter}`;
        
        // 일단 Blob URL 보여주기
        setQuestionBody(newText);
        
        // 서버에 이미지 업로드 되면 URL 업데이트 하기
        uploadImage(formData).then(({ data }) => {
          const serverApiPath = import.meta.env.VITE_API_URL;
          const serverUrl = serverApiPath + "/" + data.imagePath.replace(/\\/g, "/");
          
          // 서버로 부터 받아온 URL로 업데이트
          setQuestionBody(prevBody => prevBody.replace(blobUrl, serverUrl));
        });
        
        // 이미지 한개 붙여넣기 이후 끝내기
        break;
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // 드래그된 아이템을 드롭할 수 있도록 허용
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    
    const items = event.dataTransfer.items;
    
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const blob = await item.getAsFile();
        const formData = new FormData();
        formData.append("file", blob);
        const blobUrl = URL.createObjectURL(blob);
        
        const cursorPos = event.target.selectionStart;
        
        // 붙여 넣기 이후 Text 설정
        const textBefore = questionBody.substring(0, cursorPos);
        const textAfter = questionBody.substring(cursorPos);
        const newText = `${textBefore}![image](${blobUrl})${textAfter}`;
        
        // 일단 Blob URL 보여주기
        setQuestionBody(newText);
        
        // 서버에 이미지 업로드 되면 URL 업데이트 하기
        uploadImage(formData).then(({ data }) => {
          const serverApiPath = import.meta.env.VITE_API_URL;
          const serverUrl = serverApiPath + "/" + data.imagePath.replace(/\\/g, "/");
          
          // 서버로 부터 받아온 URL로 업데이트
          setQuestionBody(prevBody => prevBody.replace(blobUrl, serverUrl));
        });
        
        // 이미지 한개 붙여넣기 이후 끝내기
        break;
      }
    }
  };

  // 게시글 게시할 때
  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    try {
      const tags = selected.map((tag) => tag.label);
      if(id) {
        // 게시글 수정 할 시
        await updatePost(id, {title: questionTitle, body: questionBody, tags})
        alert("성공적으로 게시글이 수정되었습니다.");
        navigate(-1);
        return;
      }
      await createPost(questionTitle, questionBody, tags);
      alert("성공적으로 게시글이 올라갔습니다.");
      navigate("/QuestionList");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WriteQuestionBox>
      <MarkDownBox>
        <MarkDownTitleInput
          onChange={handleChangeQuestionTitle}
          placeholder="제목을 입력하세요"
          value={questionTitle}
        ></MarkDownTitleInput>
        <ReactTagBox>
          <ReactTags
            labelText="태그를 선택하거나 입력해주세요."
            placeholderText="태그를 선택하거나 입력해주세요."
            selected={selected}
            suggestions={suggestions}
            onAdd={onAdd}
            onDelete={onDelete}
            noOptionsText="일치하는 태그가 없습니다."
            allowNew={true}
          />
        </ReactTagBox>
        <MarkDownTextarea
          placeholder="질문에 대한 정보를 제공해주세요. 마크다운 사용이 가능합니다. 또한 이미지 붙여넣기 및 이미지 드래그 앤 드랍이 가능합니다."
          value={questionBody}
          onChange={handleChangeBodyTextarea}
          onPaste={handlePaste}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        ></MarkDownTextarea>
        <MenuBar>
          <ExitButton onClick={handleClickExitButton}>
            <img src="../../../svg/arrowleft.svg" />
            나가기{" "}
          </ExitButton>{" "}
          <PostButton onClick={handleSubmitQuestion}>게시하기</PostButton>
        </MenuBar>
      </MarkDownBox>
      <PreViewBox>
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ node, ...props }) => (
              <img
                {...props}
                style={{
                  display: "block",
                  margin: "0.5rem auto",
                  maxWidth: "80%",
                  maxHeight: "auto",
                }}
              />
            ),
          }}
          urlTransform={urlTransform}
        >
          {questionBody}
        </Markdown>
      </PreViewBox>
    </WriteQuestionBox>
  );
};

export default WriteQuestionPage;
