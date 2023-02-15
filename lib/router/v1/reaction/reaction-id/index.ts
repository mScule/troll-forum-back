import { Router } from "express"

const router = Router()
const path = "/reaction/:reactionId"

router
  .route(path)
  .get((req, res) => res.send(`/reaction/${req.params.reactionId}`))

export default {
  path,
  router
}
