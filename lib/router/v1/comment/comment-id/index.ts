import { Router } from "express"

import comment from "./comment"
import reaction from "./reaction"

const router = Router()
const path = "/comment/:commentId"

router.route(path).get((req, res) => {
  res.send(`/comment/${req.params.commentId}`)
})

export default {
  path,
  router,
  comment,
  reaction
}
