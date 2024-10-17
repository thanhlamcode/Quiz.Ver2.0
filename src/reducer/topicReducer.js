export const topicReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_TOPIC":
      return action.topic;
    default:
      return state;
  }
};
