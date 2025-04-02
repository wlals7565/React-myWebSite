import { client } from ".";

export const getUserInfo = async (username) => {
  return await client.get(`users/${username}`);
};

export const changeImageToDefault = async () => {
  return await client.post("users/my/image/default", {}, {});
};

export const uploadUserProfileImage = async (formdata) => {
  return await client.post("users/my/image", formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
