import { Div, P, Span, Image } from "react-with-native";
import { api } from "../api";
import { useEffect, useState } from "react";
import { Form, InputValues } from "../components/Form";
import useStore from "../store";
import { RWNPage } from "../types";
import { MessageType, PublicUserType } from "core";

// Now your form can be rendered like this
// Make sure to provide the generic based on the inputs type interfaces
// otherwise your form won't be typesafe!

const Page: RWNPage = () => {
  const [loginToken] = useStore("loginToken");
  const [users, setUsers] = useState<PublicUserType[]>([]);

  const fetchUsers = async () => {
    const result = await api("users", "GET");

    if (result.users) {
      setUsers(result.users);
    }
    console.log({ result });
  };

  const renderUser = (user: PublicUserType, index: number) => {
    return (
      <Div className="border rounded-xl p-4 my-4" key={`user${user.id}`}>
        <Div className="flex flex-col">
          <Span textClassName="font-bold">{user.name}</Span>
          {user.image ? <Image src={user.image} className="w-20 h-30" /> : null}
        </Div>
      </Div>
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Div scroll className="py-4 px-8 lg:px-20">
      <P className="text-3xl">Users</P>
      {users?.map(renderUser)}
    </Div>
  );
};

Page.options = {};

export default Page;
