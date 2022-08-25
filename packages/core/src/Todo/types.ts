import { DefaultModelType } from "sensible-core";

export interface TodoType extends DefaultModelType {
  /**
   * reference to the user model
   */
  userId: number;
  status: "todo" | "doing" | "done";
  author: string;
  text: string;
  title: string;
}

/**
 * 1) user fills in form on website to craete new todo
 * 2) form gets posted to server, server saves todo into database
 * 3) user can request an api to fetch all todos from database
 * 4) 3 columns are rendered on a page, in each column all todos of a certain status are listed
 * 5) user can click on a todo to go to a page with a form where he can edit the todo (change the text, or status)
 * 6) you can deploy the backend on a cloud server (linode.com) and the frontend on a nextjs hosting service (vercel.com) and buy a domain (namecheap.com) for the api and for the website
 */
