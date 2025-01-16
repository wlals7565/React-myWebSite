import { client } from ".";

export const voteToAnswer = async (answerId, vote) => {
  return await client.post(
    `/answers/${answerId}/vote?vote=${vote}`,
    {},
    { withCredentials: true }
  );
};