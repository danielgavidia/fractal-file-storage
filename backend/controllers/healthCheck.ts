import type { Request, Response } from "express";
import { s3 } from "../aws";
import { withLogging } from "../utils/withLogging";

export const healthCheck = withLogging("healthcheck", async (req: Request, res: Response) => {
  console.log("STARTED: healthcheck");
  s3.listBuckets((err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      console.log(`SUCCESS: healthcheck, data: ${data}`);
      res.status(200).send(data.Buckets);
    }
  });
});
