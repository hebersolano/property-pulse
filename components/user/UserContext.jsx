"use client";

import { getMessagesCount } from "@/lib/actions/message-actions";
import { getBookmarks } from "@/lib/actions/property-actions";
import { createContext, useContext, useEffect, useReducer } from "react";

const UserContext = createContext();

const initState = { msgCount: 0, bookmarks: [] };

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "initState":
      return { ...state, ...payload };
    case "update-msg-count": {
      return { ...state, msgCount: state.msgCount + payload };
    }
    case "bookmarks": {
      return { ...state, bookmarks: payload };
    }
    case "update-bookmarks": {
      console.log("updating bookmarks context");
      return { ...state, bookmarks: payload };
    }
  }
}

function UserProvider({ children }) {
  const [{ msgCount, bookmarks }, dispatch] = useReducer(reducer, initState);

  useEffect(function () {
    async function fetchInitState() {
      const [msgCount, bookmarks] = await Promise.all([getMessagesCount(), getBookmarks()]);
      console.log("initializing user state");
      dispatch({ type: "initState", payload: { msgCount, bookmarks } });
    }
    fetchInitState();
  }, []);

  return (
    <UserContext.Provider value={{ msgCount, bookmarks, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("context is use outside the UserProvider");
  return context;
}

function updateBookmarks() {}

export { UserProvider, useUserContext };
