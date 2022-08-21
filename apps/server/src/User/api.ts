import {
  meUserFields,
  MeUserType,
  publicUserFields,
  PublicUserType,
} from "core";
import { makeEndpoint } from "../makeEndpoint";
import User from "./model";

module.exports = [
  makeEndpoint("me", "POST", async (ctx) => {
    const { loginToken } = ctx.body;

    const profile: MeUserType | null = await User.findOne({
      where: { loginToken },
      attributes: meUserFields,
    });

    if (!profile) {
      return { response: "Incorrect login token", success: false };
    }

    return { success: true, response: "Success", profile };
  }),

  makeEndpoint("login", "POST", async (ctx) => {
    const { email, password } = ctx.body;

    const me = await User.findOne({ where: { email, password } });

    if (!me) {
      return {
        success: false,
        response: "Could not find a user with these credentials",
      };
    }

    return { response: "Logged in", success: true, loginToken: me.loginToken };
  }),

  makeEndpoint("signup", "POST", async (ctx) => {
    const { email, name, password, username } = ctx.body;

    const user = await User.create({
      email,
      name,
      password,
      username,
      loginToken: `token${Math.round(Math.random() * 999999999999999)}`,
    });

    //todo: create and send password to the todos email

    const success = !!user;

    return {
      response: success ? "Created User" : "Something went wrong",
      success,
    };
  }),

  makeEndpoint("updateProfile", "POST", async (ctx) => {
    const { email, image, loginToken, name, username } = ctx.body;

    const me = await User.findOne({ where: { loginToken } });
    if (!me) {
      return { success: false, response: "Incorrect credentials" };
    }

    const [updated] = await User.update(
      { email, image, name, username },
      { where: { loginToken } }
    );

    const success = updated === 1;

    return {
      success,
      response: success ? "Updated your profile" : "Something went wrong",
    };
  }),

  makeEndpoint("users", "GET", async (ctx) => {
    const users: PublicUserType[] | null = await User.findAll({
      where: {},
      attributes: publicUserFields,
    });

    return {
      success: true,
      users,
    };
  }),
];
