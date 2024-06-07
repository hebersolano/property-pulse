"use client";

import { getMessagesCount } from "@/app/messages/actions";
import { createContext, useContext, useEffect, useReducer } from "react";

const UserContext = createContext();

const initState = { msgCount: 0, isAuthenticated: false };

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "msg-count":
      return { ...state, msgCount: payload };
    case "update-msg-count": {
      return { ...state, msgCount: state.msgCount + payload };
    }
  }
}

function UserProvider({ children }) {
  const [{ msgCount }, dispatch] = useReducer(reducer, initState);

  useEffect(function () {
    getMessagesCount().then((count) => dispatch({ type: "msg-count", payload: Number(count) }));
  }, []);

  return <UserContext.Provider value={{ msgCount, dispatch }}>{children}</UserContext.Provider>;
}

function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("context is use outside the UserProvider");
  return context;
}

export { UserProvider, useUserContext };
