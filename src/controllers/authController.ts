const passwordHash = require("password-hash");
import { Request, Response } from "express";
import { CustomResponse } from "../utils/response";
import { UserRepository } from "../repository/userRepository";
import { User } from "../entity/User";
const {
  validateLoginPayload,
  validateRegisterPayload,
} = require("../validation/authValidation");
const { setToken, getToken } = require("../utils/token");

const AuthController = {
  login: async (req: Request, res: Response) => {
    try {
      const { error } = validateLoginPayload(req.body);
      if (error) {
        throw new CustomResponse(
          "validation error",
          400,
          error.details[0].message,
          ""
        );
      }

      const { email, password } = req.body;

      let user;
      user = await UserRepository.getByEmail(email);
      if (user == null) {
        throw new CustomResponse("User not found", 404, [], "");
      }

      const dbPassword = user.password;
      let verify = passwordHash.verify(password, dbPassword);

      if (verify) {
        let token = setToken(user);

        return res
          .status(200)
          .json(new CustomResponse("Login successful", 200, user, token));
      } else {
        throw new CustomResponse("Invalid login credentials", 400, [], "");
      }
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      const { error } = validateRegisterPayload(req.body);
      if (error) {
        throw new CustomResponse(
          "validation error",
          400,
          error.details[0].message,
          ""
        );
      }

      const { email, password, full_name } = req.body;

      let userData;
      userData = await UserRepository.getByEmail(email);
      if (userData !== null) {
        throw new CustomResponse(
          "Email have been registered already",
          400,
          [],
          ""
        );
      }

      let hashedPassword = passwordHash.generate(password);
      const user = new User();
      user.full_name = full_name;
      user.email = email;
      user.password = hashedPassword;
      let savedUser = await UserRepository.save(user);
      let token = setToken(user);

      return res
        .status(200)
        .json(new CustomResponse("User created", 200, user, token));
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  },
};

module.exports = AuthController;
