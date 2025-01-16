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

export const getPost = async (postId) => {
  return await client.get(`/posts/${postId}`);
};

export const getAllPost = async (params) => {
  return await client.get(`/posts`, {
    params,
  });
};

export const vote = async (postId, vote) => {
  return await client.post(
    `/posts/${postId}/vote?vote=${vote}`,
    {},
    { withCredentials: true }
  );
};

export const addComment = async (postId, body) => {
  return await client.post(
    `/posts/${postId}/comments`,
    { body },
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
