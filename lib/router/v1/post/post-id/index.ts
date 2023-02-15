import { Router } from "express"

import comment from "./comment"
import reaction from "./reaction"

const router = Router()
const path = "/post/:postId"

router.route(path).get((req, res) => {
  res.send(`/post/${req.params.postId}`)
})

export default {
  path,
  router,
  comment,
  reaction
}
