import { client } from ".";

export const recommendsToReply = async (replyId) => {
  return await client.post(`replies/${replyId}/recommendations`, undefined, {withCredentials: true})
}

/*
export const getAllRecommendations = async (commentId) => {
  return await client.post(`comments/${commentId}}/recommendations`)
}
*/