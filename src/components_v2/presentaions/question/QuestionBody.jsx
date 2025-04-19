import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";
import PropTypes from "prop-types";

const urlTransform = (url, key, node) => {
  return url; // URL을 그대로 반환
};

const QuestionBody = ({body}) => {
  return (
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
        {body}
      </Markdown>
  )
}

QuestionBody.propTypes = {
  body: PropTypes.string,
}

export default React.memo(QuestionBody)