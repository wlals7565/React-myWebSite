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

export const replyToCommnet = async (commentId, body, recipientId) => {
  return await client.post(`/comments/${commentId}/reply`, {body, recipientId})
}

export const getAllReply = async (commentId) => {
  return await client.get(`/comments/${commentId}/replies`)
}