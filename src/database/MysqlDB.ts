import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";

const MysqlDB = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "abbey_mortage_bank",
  entities: [User],
  synchronize: true,
  logging: false,
});

module.exports = MysqlDB;
