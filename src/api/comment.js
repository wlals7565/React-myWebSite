import { client } from ".";

export const recommendsToComment = async (commentId) => {
  return await client.post(`comments/${commentId}/recommendations`, undefined, {withCredentials: true})
}

export const getAllRecommendations = async (commentId) => {
  return await client.post(`comments/${commentId}}/recommendations`)
}

export const updateComment = async (commentId, body) => {
  return await client.patch(`comments/${commentId}`, {body} )
}

export const deleteComment = async (commentId) => {
  return await client.delete(`comments/${commentId}`)
}