import { client } from ".";

export const getUserInfo = async (username) => {
  return await client.get(`users/${username}`)
}