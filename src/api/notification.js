import { client } from ".";

export const getAllAlarms = async () => {
  const allAlarms = await client.get('/notifications')
  return allAlarms;
}