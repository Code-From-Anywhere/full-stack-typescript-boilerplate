import { Div } from "react-with-native";
import { api } from "../api";
import { Form, InputValues, makeField } from "../components/Form";
import useStore from "../store";
import { RWNPage } from "../types";

const fields = [
  makeField("text", {
    field: "title",
    title: "Title",
  }),
  makeField("textArea", {
    field: "text",
    title: "Todo",
  }),
];

// Now your form can be rendered like this
// Make sure to provide the generic based on the inputs type interfaces
// otherwise your form won't be typesafe!

const Page: RWNPage = () => {
  const [loginToken] = useStore("loginToken");

  return (
    <Div scroll className="py-4 px-8 lg:px-20">
      <Form<{
        title: InputValues["text"];
        text: InputValues["textArea"];
      }>
        title="Make new todo"
        fields={fields}
        onSubmit={async (values, resolve, reject) => {
          //do something with those values

          const { text, title } = values;

          if (loginToken === null) {
            reject("You need to login first");
            return;
          }

          const body = {
            text,
            title,
            loginToken,
          };

          const response = await api("todo", "POST", body);
          if (response.success) {
            resolve(response.response);
          } else {
            reject(response.response);
          }
        }}
      />
    </Div>
  );
};

Page.options = {};

export default Page;
