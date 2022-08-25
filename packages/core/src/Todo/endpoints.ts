import { DefaultResponse, Endpoint } from "sensible-core";
import { TodoType } from "./types";

export interface TodoEndpoint extends Endpoint {
  method: "POST";
  body: {
    loginToken: string;
    title: string;
    text: string;
  };
  response: DefaultResponse;
}

export interface UpdateTodoEndpoint extends Endpoint {
  method: "POST";
  body: {
    id: number;
    loginToken: string;
    status: "todo" | "doing" | "done";
  };
  response: DefaultResponse;
}

export interface TodosEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: {
    success: boolean;
    todos: TodoType[];
  };
}

export interface TodoEndpoints {
  todo: TodoEndpoint;
  todos: TodosEndpoint;
  updateTodo: UpdateTodoEndpoint;
}
