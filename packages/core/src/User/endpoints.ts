import { DefaultResponse, Endpoint } from "sensible-core";
import { MeUserType, PublicUserType } from "./types";

export interface SignupEndpoint extends Endpoint {
  method: "POST";
  body: {
    email: string;
    name: string;
    username: string;
    password: string;
    subscribeToNewsletter?: boolean;
  };
  response: DefaultResponse;
}

export interface UpdateProfileEndpoint extends Endpoint {
  method: "POST";
  body: {
    loginToken: string;
    email: string;
    name: string;
    username: string;
    image: string;
  };
  response: DefaultResponse;
}

export interface LoginEndpoint extends Endpoint {
  method: "POST";
  body: {
    email: string;
    password: string;
  };
  response: DefaultResponse & { loginToken?: string };
}

export interface MeEndpoint extends Endpoint {
  method: "POST";
  body: {
    loginToken: string;
  };
  response: { success: boolean; response: string; profile?: MeUserType };
}

export interface UsersEndpoint extends Endpoint {
  method: "GET";
  body: {};
  response: {
    success: boolean;
    users: PublicUserType[];
  };
}

export interface UserEndpoints {
  signup: SignupEndpoint;
  login: LoginEndpoint;
  users: UsersEndpoint;
  me: MeEndpoint;
  updateProfile: UpdateProfileEndpoint;
}
