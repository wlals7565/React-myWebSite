import { client } from ".";

export const recommendsToComment = async (commentId) => {
  return await client.post(`comments/${commentId}/recommends`, undefined, {withCredentials: true})
}

export const getAllRecommends = async (commentId) => {
  return await client.post(`comments/${commentId}}/recommends`)
}