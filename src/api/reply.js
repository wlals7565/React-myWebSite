import { client } from ".";

export const recommendsToReply = async (replyId) => {
  return await client.post(`replies/${replyId}/recommendations`, undefined, {withCredentials: true})
}

export const patchReply = async(replyId, body) => {
  return await client.patch(`replies/${replyId}`, {body})
}

export const deleteReply = async (replyId) => {
  return await client.delete(`replies/${replyId}`)
}

/*
export const getAllRecommendations = async (commentId) => {
  return await client.post(`comments/${commentId}}/recommendations`)
}
*/