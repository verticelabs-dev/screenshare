// Dependencies
import { Router, Request, Response } from "express";
const route = Router();

export default (app: Router) => {
  app.use("/", route);

  route.get("/ping", async (req: Request, res: Response) => {
    // req.log.info('test');

    return res.status(200).send({
      message: "pong",
    });
  });
};
