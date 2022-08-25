import { makeEndpoint } from "../makeEndpoint";
import User from "../User/model";
import Todo from "./model";

module.exports = [
  makeEndpoint("updateTodo", "POST", async (ctx) => {
    const { loginToken, status, id } = ctx.body;

    const me = await User.findOne({ where: { loginToken } });

    if (!me) {
      return { response: "You have to be logged in", success: false };
    }

    const [updated] = await Todo.update(
      { status },
      { where: { id, userId: me.id } }
    );

    const success = updated === 1;

    return { success, response: success ? "Updated" : "Something went wrong" };
  }),
  makeEndpoint("todo", "POST", async (ctx) => {
    const { text, title, loginToken } = ctx.body;

    const me = await User.findOne({ where: { loginToken } });

    if (!me) {
      return { response: "Could not find you in the database", success: false };
    }

    const todo = await Todo.create({
      userId: me.id,
      author: me.name,
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
