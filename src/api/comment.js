import { client } from ".";

export const recommendsToComment = async (commentId) => {
  return await client.post(`comments/${commentId}/recommendations`, undefined, {withCredentials: true})
}

export const getAllRecommendations = async (commentId) => {
  return await client.post(`comments/${commentId}}/recommendations`)
}