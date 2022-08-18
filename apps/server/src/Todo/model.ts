import { Table, Column, Index } from "sequelize-typescript";
import { DefaultModel } from "sensible-server";
import { TodoType } from "core";

interface TodoCreationType extends Partial<TodoType> {}

@Table
export class Todo
  extends DefaultModel<TodoType, TodoCreationType>
  implements TodoType
{
  @Column
  public author!: string;

  @Column
  public text!: string;

  @Column
  public title!: string;

  @Column
  public status!: "todo" | "doing" | "done";
}

export default Todo;
