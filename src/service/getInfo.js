import { get } from "../until/request";

export const getInfo = async () => {
  const results = await get("/users");
  return results;
};
