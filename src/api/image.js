import { client } from ".";

export const uploadImage = async (formData) => {
  return await client.post('/images', formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',  // axios가 자동으로 Content-Type을 처리해주지만, 필요시 명시적으로 추가
    },
  })
}