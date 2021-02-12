import * as React from "react";

/*
    #4: Why move to a reducer?

    Avoid creating callbacks?
*/

const Child = ({ count, increment }) => <div />;

const MyComponent = () => {
  const [count, setCount] = React.useState(0);

  const increment = React.useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return <Child count={count} increment={increment} />;
};
