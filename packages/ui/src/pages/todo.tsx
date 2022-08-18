import { Div } from "react-with-native";
import { api } from "../api";
import { Form, InputValues, makeField } from "../components/Form";
import { RWNPage } from "../types";

const fields = [
  makeField("text", {
    field: "author",
    title: "Author",
  }),
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
  return (
    <Div scroll className="py-4 px-8 lg:px-20">
      <Form<{
        author: InputValues["text"];
        text: InputValues["textArea"];
        title: InputValues["text"];
      }>
        title="Make new todo"
        fields={fields}
        onSubmit={async (values, resolve, reject) => {
          //do something with those values

          const response = await api("todo", "POST", values);
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
