const jwt = require("jsonwebtoken");
import { User } from "../entity/User";
require("dotenv").config();

export const setToken = (user: User) => {
  var accessToken = jwt.sign(
    { email: user.email, id: user.id },
    process.env.APP_JWT,
    {
      algorithm: "HS256",
    },
    {
      expiresIn: "30d", ////// expires in 30 days
    }
  );

  return accessToken;
};

export const getToken = (token: any) => {
  try {
    const decoded = jwt.verify(token, process.env.APP_JWT);
    return decoded;
  } catch (ex) {
    return 0;
  }
};
