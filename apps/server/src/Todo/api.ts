import { makeEndpoint } from "../makeEndpoint";
import Todo from "./model";

module.exports = [
  makeEndpoint("todo", "POST", async (ctx) => {
    const { author, text, title } = ctx.body;

    const todo = await Todo.create({
      author,
      status: "todo",
      text,
      title,
    });

    //todo: create and send password to the todos email

    const success = !!todo;

    return {
      response: success ? "Created todo" : "Something went wrong",
      success,
    };
  }),

  makeEndpoint("todos", "GET", async (ctx) => {
    const todos = await Todo.findAll({ where: {} });

    return {
      success: true,
      todos,
    };
  }),
];
