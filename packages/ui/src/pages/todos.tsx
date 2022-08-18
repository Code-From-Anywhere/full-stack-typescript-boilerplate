import { Div, P, Span } from "react-with-native";
import { api } from "../api";
import { useEffect, useState } from "react";
import { Form, InputValues, makeField } from "../components/Form";
import useStore from "../store";
import { RWNPage } from "../types";
import { TodoType } from "core";

// Now your form can be rendered like this
// Make sure to provide the generic based on the inputs type interfaces
// otherwise your form won't be typesafe!

const Page: RWNPage = () => {
  const [loginToken] = useStore("loginToken");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const fetchTodos = async () => {
    const { todos } = await api("todos", "GET");
    setTodos(todos);
  };

  useEffect(() => {
    fetchTodos();
    const interval = setInterval(fetchTodos, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderTodo = (todo: TodoType, index: number) => {
    return (
      <Div key={`todo${todo.id}`}>
        <P>
          <Span textClassName="font-bold">
            {todo.title} ({todo.author})
          </Span>
          : {todo.text}
        </P>
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
