import { MeUserType, UserType } from "core";
import { useEffect, useState } from "react";
import { Div, P } from "react-with-native";
import { Item } from "react-with-native-select";
import { api } from "../api";
import { CodeLink } from "../components";
import { Form, InputValues, makeField } from "../components/Form";
import useStore from "../store";
import { RWNPage } from "../types";

const fields = [
  makeField("text", {
    field: "email",
    title: "Email",
  }),
  makeField("text", {
    field: "name",
    title: "Name",
  }),

  makeField("text", {
    field: "password",
    title: "Password",
  }),

  makeField("text", {
    field: "username",
    title: "Username",
  }),

  makeField("text", {
    field: "image",
    title: "Image",
  }),
];

// Now your form can be rendered like this
// Make sure to provide the generic based on the inputs type interfaces
// otherwise your form won't be typesafe!

const Page: RWNPage = () => {
  const [loginToken, _, { hydrated }] = useStore("loginToken");
  const [profile, setProfile] = useState<null | MeUserType>(null);
  useEffect(() => {
    if (!hydrated) return;
    if (!loginToken) return;

    console.log("Please say something", loginToken);

    api("me", "POST", { loginToken }).then((result) => {
      console.log({ result });
      if (result.profile) {
        setProfile(result.profile);
      } else {
        setProfile(null);
      }
    });
  }, [hydrated, loginToken]);
  return (
    <Div scroll className="py-4 px-8 lg:px-20">
      {!loginToken ? (
        <P>Please login first</P>
      ) : (
        <Div>
          <Form<{
            email: InputValues["text"];
            name: InputValues["text"];
            username: InputValues["text"];
            image: InputValues["text"];
          }>
            title="Change your profile"
            fields={fields}
            onSubmit={async (values, resolve, reject) => {
              //do something with those values
              const response = await api("updateProfile", "POST", {
                ...values,
                loginToken,
              });

              if (response.success) {
                resolve(response.response);
              } else {
                reject(response.response);
              }
            }}
            defaultValues={profile || {}}
          />
        </Div>
      )}
    </Div>
  );
};

Page.options = {};

export default Page;
