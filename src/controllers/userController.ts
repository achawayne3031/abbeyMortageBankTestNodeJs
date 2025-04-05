const passwordHash = require("password-hash");
import { Request, Response } from "express";
import { CustomResponse } from "../utils/response";
import { UserRepository } from "../repository/userRepository";

const UserController = {
  users: async (req: Request, res: Response) => {
    try {
      let users = await UserRepository.users();

      //   const userRepository = getRepository(User);
      //   const users = await userRepository.find();

      return res
        .status(200)
        .json(new CustomResponse("All users", 200, users, ""));
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  },

  followers: async (req: Request, res: Response) => {
    try {
      let users = await UserRepository.users();

      //   const userRepository = getRepository(User);
      //   const users = await userRepository.find();

      return res
        .status(200)
        .json(new CustomResponse("user followers", 200, users, ""));
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  },
};

module.exports = UserController;
