export const inforUserName = (id) => {
  return {
    type: "SET_USER_NAME",
    userId: id,
  };
};

export const answerUser = (answers) => {
  return {
    type: "SET_USER_ANSWER",
    answers: answers,
  };
};
