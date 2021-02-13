import axios from "axios";
import * as React from "react";

/*
    #10: Rendering states
*/

const transition = (state, action, transitions) =>
  transitions[state.state] && transitions[state.state][action.type]
    ? transitions[state.state][action.type](action, state)
    : state;

const exec = (state, effects) =>
  effects[state.state] && effects[state.state](state);

const MyComponent = () => {
  const [todos, dispatch] = React.useReducer(
    (todos, action) =>
      transition(todos, action, {
        NOT_LOADED: {
          FETCH_TODOS: () => ({ state: "LOADING" }),
        },
        LOADING: {
          FETCH_TODOS_SUCCESS: ({ data }) => ({ state: "LOADED", data }),
          FETCH_TODOS_ERROR: ({ error }) => ({ state: "ERROR", error }),
        },
        LOADED: {},
        ERROR: {},
      }),
    {
      state: "NOT_LOADED",
    }
  );

  React.useEffect(
    () =>
      exec(todos, {
        LOADING: () => {
          axios
            .get("/todos")
            .then((response) => {
              dispatch({ type: "FETCH_TODOS_SUCCESS", data: response.data });
            })
            .catch((error) => {
              dispatch({ type: "FETCH_TODOS_ERROR", error: error.message });
            });
        },
      }),
    [todos]
  );

  return <div className="wrapper"></div>;
};
