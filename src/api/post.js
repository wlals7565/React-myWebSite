import { client } from ".";

export const createPost = async (title, body, tags) => {
  await client.post(
    "/posts",
    {
      title,
      body,
      tags,
    },
    { withCredentials: true }
  );
};

export const getQuestion = async (postId) => {
  return await client.get(`/posts/${postId}`);
};

export const getAllQuestions = async (params) => {
  return await client.get(`/posts`, {
    params,
  });
};

export const voteToPost = async (postId, vote) => {
  return await client.post(
    `/posts/${postId}/vote?vote=${vote}`,
    {},
    { withCredentials: true }
  );
};
//
export const addComment = async (postId, body) => {
  return await client.post(
    `/posts/${postId}/comments`,
    body,
    { withCredentials: true }
  );
};

export const addAnswer = async (postId, body) => {
  return await client.post(
    `/posts/${postId}/answers`,
    {
      body,
    },
    { withCredentials: true }
  );
};

export const deletePost = async (postId) => {
  return await client.delete(
    `/posts/${postId}`,
    { withCredentials: true}
  )
}

export const updatePost = async (postId, updatePostDto) => {
  return await client.patch(`/posts/${postId}`, updatePostDto)
}