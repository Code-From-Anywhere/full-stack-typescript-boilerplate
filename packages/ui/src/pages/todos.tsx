import { Div, P, Span } from "react-with-native";
import { SelectInput } from "react-with-native-form-inputs";
import { api } from "../api";
import { useEffect, useState } from "react";
import useStore from "../store";
import { RWNPage } from "../types";
import { MeUserType, TodoType, UpdateTodoEndpoint } from "core";
import { useAlert } from "react-with-native-alert";

// Now your form can be rendered like this
// Make sure to provide the generic based on the inputs type interfaces
// otherwise your form won't be typesafe!

const Page: RWNPage = () => {
  const [loginToken] = useStore("loginToken");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [me, setMe] = useState<null | MeUserType>(null);

  const alert = useAlert();

  const fetchTodos = async () => {
    const { todos } = await api("todos", "GET");
    setTodos(todos);
  };

  const fetchMe = async (loginToken: string) => {
    const result = await api("me", "POST", { loginToken });

    if (result.profile) {
      setMe(result.profile);
    }
  };

  useEffect(() => {
    if (!loginToken) return;

    fetchMe(loginToken);
  }, [loginToken]);

  useEffect(() => {
    fetchTodos();
    const interval = setInterval(fetchTodos, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderTodo = (todo: TodoType, index: number) => {
    const isMyTodo: boolean = todo.userId === me?.id;

    const renderChangeStatus = () => {
      return (
        <SelectInput
          extra={{
            options: [
              { value: "todo", label: "Todo" },
              { value: "doing", label: "Doing" },
              { value: "done", label: "Done" },
            ],
          }}
          value={{ value: todo.status as string, label: todo.status as string }}
          onChange={async (newValue) => {
            const allowedStatuses = ["todo", "doing", "done"];

            const status = newValue?.value;

            if (!loginToken) {
              return;
            }

            if (status && allowedStatuses.includes(status)) {
              const realStatus = status as TodoType["status"];

              const body: UpdateTodoEndpoint["body"] = {
                id: todo.id,
                loginToken,
                status: realStatus,
              };

              const result = await api("updateTodo", "POST", body);

              alert?.(result.response);
            } else {
              alert?.("Hey, this status doesn't work");
            }
          }}
          config={{}}
          fieldName=""
          uniqueFieldId={`setStatus${todo.id}`}
        />
      );
    };

    return (
      <Div className="border rounded-xl p-4 my-4" key={`todo${todo.id}`}>
        <Div className="flex flex-row justify-between">
          <P className="font-bold">{todo.title}</P>

          <Div>
            <P>🧓 {todo.author}</P>

            {isMyTodo ? renderChangeStatus() : <P>Status: {todo.status}</P>}
          </Div>
        </Div>
        <Span textClassName="italic">{todo.text}</Span>
      </Div>
    );
  };

  return (
    <Div scroll className="py-4 px-8 lg:px-20">
      {todos.map(renderTodo)}
    </Div>
  );
};

Page.options = {};

export default Page;
