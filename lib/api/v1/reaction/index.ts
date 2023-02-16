import { Router } from "express";
import handler from "./handler";

import reactionId from "./reaction-id";

const router = Router()
const path = "/reaction"

router.route(path).get(handler.get)

export default {
  path,
  router,
  reactionId
}
