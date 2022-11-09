export const loggerMiddleware = (store) => (next) => (action) => {
  // we are using the currying knowledge here
  if (!action.type) {
    return next(action);
  }
  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("next state:", store.getState());
};
