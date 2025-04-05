import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Peer {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.peers)
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "peerId" })
  peer!: User;
}
