const MysqlDB = require("../database/MysqlDB");
import { Follower } from "../entity/Follower";

export const FollowerRepository = MysqlDB.getRepository(Follower).extend({
  async userFollowing(user: number) {
    return await this.createQueryBuilder("follower")
      .where("follower.follower = :user", { user })
      .leftJoinAndSelect("follower.user", "users")
      .getMany();
  },

  async userFollowers(user: number) {
    return await this.createQueryBuilder("follower")
      .where("follower.user = :user", { user })
      .leftJoinAndSelect("follower.user", "users")
      .getMany();
  },

  async unFollow(userId: number, followingId: number) {
    return this.createQueryBuilder("follower")
      .delete()
      .from(Follower)
      .where("follower.userId = :userId", { userId })
      .andWhere("follower.followerId = :followingId", { followingId })
      .execute();
  },

  async findById(id: number) {
    return await this.createQueryBuilder("follower")
      .where("follower.id = :id", { id: id })
      .getOne();
  },

  async checkFollowedUser(userId: number, followerId: number) {
    return await this.createQueryBuilder("follower")
      .where("follower.user = :userId", { userId })
      .andWhere("follower.follower = :followerId", { followerId })
      .getOne();
  },

  followers() {
    let followers = this.createQueryBuilder("follower").getMany();
    return followers;
  },
});
