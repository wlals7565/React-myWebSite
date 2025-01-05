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
  return await client.get(`/posts/${postId}`)
}

export const getAllPost = async (params) => {
  return await client.get(`/posts`, {
    params
  })
}