import axios from "axios";
import * as React from "react";
import { transition, exec, transform } from "react-states";

/*
    #11: Creating a context
*/

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
    { state: "NOT_LOADED" }
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

  return (
    <div>
      {transform(todos, {
        NOT_LOADED: () => "Not loaded...",
        LOADING: () => "Loading",
        LOADED: ({ data }) => (
          <ul>
            {data.map((todo) => (
              <li>{todo.title}</li>
            ))}
          </ul>
        ),
        ERROR: ({ error }) => `Error: ${error}`,
      })}
    </div>
  );
};
