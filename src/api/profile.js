import { client } from ".";

export const checkAuth = async (callbackfn) => {
  try {
    const { data } = await client.get("/profiles/me");

    if (!data) {
      return;
    }
    callbackfn(data);
  } catch (err) {
    console.error(err);
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
    callbackfn(data.imageUrl);
  } catch (error) {
    console.error(error);
  }
};

export const patchProfileAboutMe = async (aboutMe, username) => {
  try {
    await client.patch(
      `/profiles/${username}/aboutMe`,
      { aboutMe },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(error);
  }
};
