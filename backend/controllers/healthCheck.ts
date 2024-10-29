import type { Request, Response } from "express";
import { s3 } from "../aws";

export const healthCheck = async (req: Request, res: Response) => {
  s3.listBuckets((err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data.Buckets);
    }
  });
};
