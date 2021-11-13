import React, { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  data: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "DATA_UPDATED":
      return {
        data: payload,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
};
