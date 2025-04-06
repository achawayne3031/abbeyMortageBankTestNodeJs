const MysqlDB = require("../database/MysqlDB");
import { Friend } from "../entity/Friend";

export const FriendRepository = MysqlDB.getRepository(Friend).extend({
  async userFriends(user: number) {
    return await this.createQueryBuilder("friend")
      .where("friend.user = :user", { user })
      .leftJoinAndSelect("friend.friend", "users")
      .getMany();
  },

  async unFriend(userId: number, friendId: number) {
    return this.createQueryBuilder("friend")
      .delete()
      .from(Friend)
      .where("friend.userId = :userId", { userId })
      .andWhere("friend.friendId = :friendId", { friendId })
      .execute();
  },

  async findById(id: number) {
    return await this.createQueryBuilder("friend")
      .where("friend.id = :id", { id: id })
      .getOne();
  },

  async checkFriendUser(userId: number, friendId: number) {
    return await this.createQueryBuilder("friend")
      .where("friend.user = :userId", { userId })
      .andWhere("friend.friend = :friendId", { friendId })
      .getOne();
  },

  async friends() {
    return await this.createQueryBuilder("friend").getMany();
  },
});
