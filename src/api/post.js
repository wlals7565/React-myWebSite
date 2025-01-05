import { client } from ".";

export const createPost = async (title, body) => {
  await client.post(
    "/posts",
    {
      title,
      body,
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