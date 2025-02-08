import { client } from ".";

export const checkAuth = async (callbackfn) => {
  try {
    const { data } = await client.get("/profiles/me");

    if (!data) {
      return;
    }
    callbackfn(data);
  } catch (err) {
    console.log(err);
  }
};

export const getUserProfile = async (username, callbackfn) => {
  try {
    const {data} = await client.get(`/profiles/${username}`);
    callbackfn(data);
  } catch(error) {
    console.error(error);
  }
}
