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
          return { isLoading: true, error: null };
        case "FETCH_TODOS_SUCCESS":
          return { isLoading: false, data: action.data };
        case "FETCH_TODOS_ERROR":
          return { isLoading: false, error: action.error };
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
