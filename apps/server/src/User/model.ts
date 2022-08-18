import { Table, Column, Index } from "sequelize-typescript";
import { DefaultModel } from "sensible-server";
import { UserType } from "core";


interface UserCreationType extends Partial<UserType> {}

@Table
export class User
  extends DefaultModel<UserType, UserCreationType>
  implements UserType
{
  @Column
  public email!: string;

  @Column
  public username!: string;

  @Column
  public name!: string;

  @Column
  public loginToken!: string;
  
  @Column
  public image!: string;

  @Column
  public password!: string;
}



export default User;
