import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Follower } from "../entity/Follower";
import { Friend } from "../entity/Friend";
import { Peer } from "../entity/Peer";

const MysqlDB = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "abbey_mortage_bank",
  entities: [User, Follower, Friend, Peer],
  synchronize: true,
  logging: false,
});

module.exports = MysqlDB;
