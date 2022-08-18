import { DefaultResponse, Endpoint } from "sensible-core";
import { TodoType } from "./types";

export interface TodoEndpoint extends Endpoint {
  method: "POST";
  body: {
    author: string;
    text: string;
    title: string;
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
}
