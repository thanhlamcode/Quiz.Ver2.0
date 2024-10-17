import { get } from "../until/request";

export const getQuestion = async () => {
  const results = await get("/questions");
  return results;
};
