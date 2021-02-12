import * as React from "react";

/*
    #12: Constraining states
*/

const MyComponent = () => {
  const [todos, dispatch] = React.useReducer(
    (todos, action) => {
      switch (action.type) {
        case "FETCH_TODOS":
          return { state: "LOADING" };
        case "FETCH_TODOS_SUCCESS":
          return { state: "LOADED", data: action.data };
        case "FETCH_TODOS_ERROR":
          return { state: "ERROR", error: action.error };
      }
      return todos;
    },
    { state: "NOT_LOADED" }
  );
};
