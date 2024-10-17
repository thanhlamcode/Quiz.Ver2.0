import { get } from "../until/request";

export const getUserAnswer = async () => {
  const results = await get("/userAnswers");
  return results;
};
