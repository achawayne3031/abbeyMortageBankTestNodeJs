import { CustomResponse } from "../utils/response";
const jwt = require("jsonwebtoken");

async function AuthMiddleware(req: any, res: any, next: any) {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(403)
      .json(
        new CustomResponse(
          "Access denied. No authorization. not token found",
          403,
          null,
          ""
        )
      );

  try {
    jwt.verify(token, process.env.APP_JWT);

    next();
  } catch (ex) {
    return res
      .status(400)
      .send(new CustomResponse("Invalid token", 400, [], ""));
  }
}

module.exports = AuthMiddleware;
