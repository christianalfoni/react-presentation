import * as React from "react";

/*
    #5: Why move to a reducer?
*/

const MyComponent = () => {
  const [count, dispatch] = React.useReducer((state, action) => {
    return state;
  }, 0);
};
