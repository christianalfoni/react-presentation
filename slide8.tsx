import * as React from "react";

/*
    #11: Using states in a reducer

    Making the implicit states explicit
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
};
