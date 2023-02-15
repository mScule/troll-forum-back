import { Router } from "express";

import reactionId from "./reaction-id";

const router = Router()
const path = "/reaction"

router.route(path).get((req, res) => res.send(`/reaction`))

export default {
  path,
  router,
  reactionId
}
