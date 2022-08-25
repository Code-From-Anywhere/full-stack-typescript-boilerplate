import { Button, Div, Li, Span, Ul } from "react-with-native";
import pages, { getPageTitle } from "../pages";
import { useRouter } from "react-with-native-router";
import useStore from "../store";

const Menu = () => {
  const router = useRouter();
  const [loginToken, setLoginToken, { hydrated }] = useStore("loginToken");

  const isLoggedIn: boolean = !!loginToken;

  return (
    <Ul className="w-full">
      {pages.map((page) => {
        if (page?.hideFromMenu) return;

        const title = getPageTitle(page);
        return (
          <Li key={`page${page.key}`} className="w-full">
            <Button
              className="p-4 border-b  border-b-gray-300 w-full flex flex-row items-center justify-between"
              textClassName="text-xl hover:text-blue-800"
              onClick={() => router.push(page.key === "index" ? "/" : page.key)}
            >
              <Span>{title}</Span>
              <Span textClassName="text-3xl">›</Span>
            </Button>
          </Li>
        );
      })}
      {isLoggedIn ? (
        <Li className="w-full">
          <Button
            className="p-4 border-b  border-b-gray-300 w-full flex flex-row items-center justify-between"
            textClassName="text-xl hover:text-blue-800"
            onClick={() => {
              setLoginToken(null);
            }}
          >
            <Span textClassName="text-red-500">Logout</Span>
          </Button>
        </Li>
      ) : null}
    </Ul>
  );
};

export default Menu;
