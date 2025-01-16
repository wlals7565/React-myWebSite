import { client } from ".";

export const recommands = async (commentId) => {
  return await client.post(`comments/${commentId}/recommands`, undefined, {withCredentials: true})
}

export const getAllRecommands = async (commentId) => {
  return await client.post(`comments/${commentId}}/recommands`)
}