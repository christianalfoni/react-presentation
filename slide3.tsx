import * as React from "react";

/*
    #3: Why move to a reducer?

    State complexity?
*/

const MyComponent = () => {
  const [todos, setTodos] = React.useState({
    isLoading: false,
    data: [],
    error: null,
  });
};
