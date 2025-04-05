import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.friends)
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "friendId" })
  friend!: User;
}
