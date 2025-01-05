import { client } from ".";

const checkAuth = async (callbackfn) => {
  try {
    const { data } = await client.get("/profiles/me");
    console.log(data)
    callbackfn(data)
  } catch (err) {
    console.log(err);
  }
};

export default checkAuth;