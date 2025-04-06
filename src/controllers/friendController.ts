import { Request, Response } from "express";
import { CustomResponse } from "../utils/response";
import { UserRepository } from "../repository/userRepository";
import {
  validateFriendUserPayload,
  validateUnFriendUserPayload,
} from "../validation/friendValidation";
import { getToken } from "../utils/token";
import { Friend } from "../entity/Friend";
import { FriendRepository } from "../repository/friendRepository";
const MysqlDB = require("../database/MysqlDB");

const FriendController = {
  friendUser: async (req: Request, res: Response) => {
    try {
      const { error } = validateFriendUserPayload(req.body);
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

      if (parseInt(id) == parseInt(userId)) {
        throw new CustomResponse(
          "Not allowed, You cant friend yourself",
          404,
          [],
          ""
        );
      }

      let userData;
      userData = await UserRepository.findById(parseInt(id));

      if (userData == null) {
        throw new CustomResponse("User not found", 404, [], "");
      }

      let friendData;
      friendData = await UserRepository.findById(parseInt(userId));

      if (friendData == null) {
        throw new CustomResponse("friend user not found", 404, [], "");
      }

      let checkFriend = await FriendRepository.checkFriendUser(
        parseInt(id),
        parseInt(userId)
      );

      if (checkFriend != null) {
        throw new CustomResponse("User already your friend", 400, [], "");
      }

      const friend = new Friend();
      friend.user = userData;
      friend.friend = friendData;

      await MysqlDB.manager.save(friend);

      return res
        .status(200)
        .json(
          new CustomResponse("User added to your friend list", 200, [], "")
        );
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  },

  unFriendUser: async (req: Request, res: Response) => {
    try {
      const { error } = validateUnFriendUserPayload(req.body);
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
      const { friendId } = req.body;

      if (tokenData == 0) {
        throw new CustomResponse("Invalid token", 400, [], "");
      }

      const { id } = tokenData;

      let checkFriend = await FriendRepository.checkFriendUser(
        parseInt(id),
        parseInt(friendId)
      );

      if (checkFriend == null) {
        throw new CustomResponse("User not on your friend list", 400, [], "");
      }

      await FriendRepository.unFriend(parseInt(id), parseInt(friendId));

      return res
        .status(200)
        .json(
          new CustomResponse(
            "Friend removed from your friend list",
            200,
            [],
            ""
          )
        );
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  },
};

module.exports = FriendController;
