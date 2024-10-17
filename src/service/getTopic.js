import { get } from "../until/request";

export const getTopic = async () => {
  const results = await get("/topics");
  return results;
};
