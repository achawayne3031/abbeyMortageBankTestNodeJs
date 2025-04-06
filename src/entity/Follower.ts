import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Follower {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "followerId" })
  follower!: User;
}
