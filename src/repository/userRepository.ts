const MysqlDB = require("../database/MysqlDB");
import { User } from "../entity/User";

export const UserRepository = MysqlDB.getRepository(User).extend({
  async findById(id: number) {
    return await this.createQueryBuilder("users")
      .where("users.id = :id", { id: id })
      .getOne();
  },

  users() {
    let users = this.createQueryBuilder("users").getMany();
    return users;
  },

  getByEmail(email: string) {
    return this.createQueryBuilder("users")
      .where("users.email = :email", { email: email })
      .getOne();
  },

  async update(user: User) {
    return await this.createQueryBuilder()
      .update(User)
      .set(user)
      .where("id = :id", { id: user.id })
      .execute();
  },

  async save(user: User) {
    return await this.createQueryBuilder()
      .insert()
      .into(User)
      .values([user])
      .execute();
  },

  async existsByEmail(email: string) {
    let user = await this.createQueryBuilder("users")
      .where("users.email = :email", { email: email })
      .getOne();
    if (user == null) {
      return false;
    }
    return true;
  },
});
