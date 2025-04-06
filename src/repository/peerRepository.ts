const MysqlDB = require("../database/MysqlDB");
import { Peer } from "../entity/Peer";

export const PeerRepository = MysqlDB.getRepository(Peer).extend({
  async userPeers(user: number) {
    return await this.createQueryBuilder("peer")
      .where("peer.user = :user", { user })
      .leftJoinAndSelect("peer.peer", "users")
      .getMany();
  },

  async removePeer(userId: number, peerId: number) {
    return this.createQueryBuilder("peer")
      .delete()
      .from(Peer)
      .where("peer.userId = :userId", { userId })
      .andWhere("peer.peerId = :peerId", { peerId })
      .execute();
  },

  async findById(id: number) {
    return await this.createQueryBuilder("peer")
      .where("peer.id = :id", { id: id })
      .getOne();
  },

  async checkPeerUser(userId: number, peerId: number) {
    return await this.createQueryBuilder("peer")
      .where("peer.user = :userId", { userId })
      .andWhere("peer.peer = :peerId", { peerId })
      .getOne();
  },

  peers() {
    let peers = this.createQueryBuilder("peer").getMany();
    return peers;
  },
});
