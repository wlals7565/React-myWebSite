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
    const { data } = await client.get(`/profiles/${username}`);
    callbackfn(data);
  } catch (error) {
    console.error(error);
  }
};

export const uploadAvatar = async (username, avatar, callbackfn) => {
  try {
    const { data } = await client.post(
      `/profiles/${username}/avatar/upload`,
      avatar,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    console.log(data);
    callbackfn(data.imageUrl);
  } catch (error) {
    console.error(error);
  }
};

export const pathProfileAboutMe = async (aboutMe, username) => {
  try {
    const { data } = await client.patch(`/profiles/${username}`, {aboutMe}, {
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
};
