import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { Follower } from "./Follower";
import { Friend } from "./Friend";
import { Peer } from "./Peer";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  full_name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column("boolean", { default: false })
  is_verified!: boolean;

  @Column("boolean", { default: true })
  status!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Follower, (follower) => follower.user)
  followers!: Follower[];

  // @ManyToMany(() => User, (user) => user.following)
  // @JoinTable()
  // followers!: User[];

  // @ManyToMany(() => User, (user) => user.followers)
  // following!: User[];

  @OneToMany(() => Friend, (friend) => friend.user)
  friends!: Friend[];

  @OneToMany(() => Peer, (peer) => peer.user)
  peers!: Peer[];
}
