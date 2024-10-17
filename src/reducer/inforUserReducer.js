const initialState = {
  userId: null,
  topicId: null,
  answers: [
    {
      questionId: null,
      answer: null,
    },
  ],
};

export const inforUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_NAME":
      return {
        ...state,
        userId: action.userId,
      };
    case "TOPIC":
      return {
        ...state,
        topicId: action.topicId,
      };
    case "SET_USER_ANSWER":
      return {
        ...state,
        answers: action.answers,
      };
    default:
      return state;
  }
};
