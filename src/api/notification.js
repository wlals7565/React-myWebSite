import { client } from ".";

export const getAllAlarms = async () => {
  const allAlarms = await client.get('/notifications')
  return allAlarms;
}

export const deleteAllAlarms = async () => {
  const result = await client.delete('/notifications')
  console.log(result);
  return result;
}

export const deleteAlarm = async (alarmId) => {
  const result = await client.delete(`/notifications/${alarmId}`)
  console.log(result);
  return result;
}