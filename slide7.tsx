import * as React from "react";

/*
    #10: The implicit states
*/

type Todos =
  | {
      state: "NOT_LOADED";
    }
  | {
      state: "LOADING";
    }
  | {
      state: "LOADED";
      data: Todo[];
    }
  | {
      state: "ERROR";
      error: string;
    };

type Todo = {
  title: string;
  completed: boolean;
};
