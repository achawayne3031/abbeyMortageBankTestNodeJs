const passwordHash = require("password-hash");
import { Request, Response } from "express";
import { CustomResponse } from "../utils/response";
import { UserRepository } from "../repository/userRepository";
import { getToken } from "../utils/token";
import { FriendRepository } from "../repository/friendRepository";
import { PeerRepository } from "../repository/peerRepository";
import { FollowerRepository } from "../repository/followerRepository";

const UserController = {
  users: async (req: Request, res: Response) => {
    try {
      const token = req.header("Authorization");
      let tokenData = getToken(token);

      if (tokenData == 0) {
        throw new CustomResponse("Invalid token", 400, [], "");
      }

      const { id } = tokenData;
      let users = await UserRepository.usersEx(parseInt(id));

      return res
        .status(200)
        .json(new CustomResponse("All users", 200, users, ""));
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  },

  profile: async (req: Request, res: Response) => {
    try {
      const token = req.header("Authorization");
      let tokenData = getToken(token);
      const { peerId } = req.body;

      if (tokenData == 0) {
        throw new CustomResponse("Invalid token", 400, [], "");
      }

      const { id } = tokenData;

      let userData = await UserRepository.findById(parseInt(id));
      let friendsData = await FriendRepository.userFriends(parseInt(id));
      let peerData = await PeerRepository.userPeers(parseInt(id));
      let followingData = await FollowerRepository.userFollowing(parseInt(id));

      let followerData = await FollowerRepository.userFollowers(parseInt(id));

      let resData = {
        profile: userData,
        followers: followerData,
        following: followingData,
        peer: peerData,
        friends: friendsData,
      };

      // let users = await UserRepository.users();

      return res
        .status(200)
        .json(new CustomResponse("user profile", 200, resData, ""));
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  },
};

module.exports = UserController;
