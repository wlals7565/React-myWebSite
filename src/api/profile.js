import { client } from ".";

const checkAuth = async (callbackfn) => {
  try {
    const { data } = await client.get("/profiles/me");
    console.log('checkAuth')
    console.log(data)
    if (!data) {
      return;
    }
    callbackfn(data);
  } catch (err) {
    console.log(err);
  }
};

export default checkAuth;
