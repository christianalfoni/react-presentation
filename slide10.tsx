import axios from "axios";
import * as React from "react";

/*
    #13: Constraining logic
*/

const MyComponent = () => {
  const [todos, dispatch] = React.useReducer(
    (todos, action) => {
      switch (action.type) {
        case "FETCH_TODOS":
          return { ...todos, isLoading: true };
        case "FETCH_TODOS_SUCCESS":
          return { ...todos, isLoading: false, data: action.data };
        case "FETCH_TODOS_ERROR":
          return { ...todos, isLoading: false, error: action.error };
      }
      return todos;
    },
    {
      isLoading: true,
      error: null,
      data: [],
    }
  );

  const fetchTodos = React.useCallback(() => {
    dispatch({ type: "FETCH_TODOS" });
    axios
      .get("/todos")
      .then((response) => {
        dispatch({ type: "FETCH_TODOS_SUCCESS", data: response.data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_TODOS_ERROR", error: error.message });
      });
  }, []);
};
