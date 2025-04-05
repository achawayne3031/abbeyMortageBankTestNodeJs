import { Request, Response } from "express";
import { CustomResponse } from "../utils/response";
import { UserRepository } from "../repository/userRepository";
import {
  validateFollowUserPayload,
  validateUnFollowUserPayload,
} from "../validation/followerValidation";
import { getToken } from "../utils/token";
import { Follower } from "../entity/Follower";
import { FollowerRepository } from "../repository/followerRepository";
const MysqlDB = require("../database/MysqlDB");

const FollowerController = {
  followerUser: async (req: Request, res: Response) => {
    try {
      const { error } = validateFollowUserPayload(req.body);
      if (error) {
        throw new CustomResponse(
          "validation error",
          400,
          error.details[0].message,
          ""
        );
      }

      const token = req.header("Authorization");
      let tokenData = getToken(token);
      const { userId } = req.body;

      if (tokenData == 0) {
        throw new CustomResponse("Invalid token", 400, [], "");
      }

      const { id } = tokenData;

      let followerData;
      followerData = await UserRepository.findById(parseInt(id));

      if (followerData == null) {
        throw new CustomResponse("User not found", 404, [], "");
      }

      let followingData;
      followingData = await UserRepository.findById(parseInt(userId));

      if (followingData == null) {
        throw new CustomResponse("following user not found", 404, [], "");
      }

      let checkFollowed = await FollowerRepository.checkFollowedUser(
        parseInt(userId),
        parseInt(id)
      );

      if (checkFollowed !== null) {
        throw new CustomResponse("User followed already", 400, [], "");
      }

      const follower = new Follower();
      follower.user = followingData;
      follower.follower = followerData;

      await MysqlDB.manager.save(follower);

      return res
        .status(200)
        .json(new CustomResponse("User followed", 200, [], ""));
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  },

  unFollowerUser: async (req: Request, res: Response) => {
    try {
      const { error } = validateUnFollowUserPayload(req.body);
      if (error) {
        throw new CustomResponse(
          "validation error",
          400,
          error.details[0].message,
          ""
        );
      }

      const token = req.header("Authorization");
      let tokenData = getToken(token);
      const { userId } = req.body;

      if (tokenData == 0) {
        throw new CustomResponse("Invalid token", 400, [], "");
      }

      const { id } = tokenData;

      let checkFollower = await FollowerRepository.checkFollowedUser(
        parseInt(id),
        parseInt(userId)
      );

      if (checkFollower == null) {
        throw new CustomResponse(
          "You are not following this user",
          400,
          [],
          ""
        );
      }

      await FollowerRepository.unFollow(parseInt(id), parseInt(userId));

      return res
        .status(200)
        .json(new CustomResponse("User unfollowed", 200, [], ""));
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  },
};

module.exports = FollowerController;
