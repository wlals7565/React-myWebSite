import { client } from ".";

export const uploadImage = async (formData) => {
  for (let [key, value] of formData.entries()) {
    console.log(key);  // 'file' 필드와 그 값(파일)을 출력
    console.log(value)
  }

  return await client.post('/images', formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',  // axios가 자동으로 Content-Type을 처리해주지만, 필요시 명시적으로 추가
    },
  })
}