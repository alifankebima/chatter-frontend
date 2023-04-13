const initialState = {
    count: 0,
  };

  const counterReducer = (state = initialState, action) => {
    if (action.type === "INCREMENT") {
      return {
        ...state,
        count: state.count + 1,
      };
    } else if (action.type === "DECREMENT") {
      return {
        ...state,
        count: state.count - 1,
      };
    } else {
      return state;
    }
  };

  export default counterReducer;