import { Request, Response } from "express";
import { CustomResponse } from "../utils/response";
import { UserRepository } from "../repository/userRepository";
import {
  validateAddPeerPayload,
  validateRemovePeerPayload,
} from "../validation/peerValidation";
import { getToken } from "../utils/token";
import { PeerRepository } from "../repository/peerRepository";
import { Peer } from "../entity/Peer";
const MysqlDB = require("../database/MysqlDB");

const PeerController = {
  addPeer: async (req: Request, res: Response) => {
    try {
      const { error } = validateAddPeerPayload(req.body);
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
      const { peerId } = req.body;

      if (tokenData == 0) {
        throw new CustomResponse("Invalid token", 400, [], "");
      }

      const { id } = tokenData;

      let userData;
      userData = await UserRepository.findById(parseInt(id));

      if (userData == null) {
        throw new CustomResponse("User not found", 404, [], "");
      }

      let peerData;
      peerData = await UserRepository.findById(parseInt(peerId));

      if (peerData == null) {
        throw new CustomResponse("peer not found", 404, [], "");
      }

      let checkPeer = await PeerRepository.checkPeerUser(
        parseInt(id),
        parseInt(peerId)
      );

      if (checkPeer !== null) {
        throw new CustomResponse("User already on your peer list", 400, [], "");
      }

      const peer = new Peer();
      peer.user = userData;
      peer.peer = peerData;

      await MysqlDB.manager.save(peer);

      return res
        .status(200)
        .json(new CustomResponse("Peer added to your peer list", 200, [], ""));
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  },

  removePeer: async (req: Request, res: Response) => {
    try {
      const { error } = validateRemovePeerPayload(req.body);
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
      const { peerId } = req.body;

      if (tokenData == 0) {
        throw new CustomResponse("Invalid token", 400, [], "");
      }

      const { id } = tokenData;

      let checkPeer = await PeerRepository.checkPeerUser(
        parseInt(id),
        parseInt(peerId)
      );

      if (checkPeer == null) {
        throw new CustomResponse("User not on your peer list", 400, [], "");
      }

      await PeerRepository.removePeer(parseInt(id), parseInt(peerId));

      return res
        .status(200)
        .json(
          new CustomResponse("Peer removed from your peer list", 200, [], "")
        );
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  },
};

module.exports = PeerController;
