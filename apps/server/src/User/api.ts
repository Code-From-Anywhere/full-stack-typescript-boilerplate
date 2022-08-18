import { makeEndpoint } from "../makeEndpoint";
import User from "./model";

module.exports = [
  makeEndpoint("signup", "POST", async (ctx) => {
    const { email, name, password, username } = ctx.body;

    const user = await User.create({
      email,
      name,
      password,
      username,
    });

    //todo: create and send password to the todos email

    const success = !!user;

    return {
      response: success ? "Created User" : "Something went wrong",
      success,
    };
  }),

  makeEndpoint("users", "GET", async (ctx) => {
    const users = await User.findAll({ where: {} });

    return {
      success: true,
      users,
    };
  }),
];
