import { client } from ".";

export const follow = async (userId) => {
  const result = await client.post(`/follows/${userId}`)
  return result;
}

export const unfollow = async (userId) => {
  const result = await client.delete(`/follows/${userId}`)
  return result;
}