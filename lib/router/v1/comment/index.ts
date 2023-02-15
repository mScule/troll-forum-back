import { Router } from "express"

import commentId from "./comment-id"

const router = Router()
const path = "/comment"

router.route(path).get((req, res) => {
  res.send(`/comment`)
})

export default {
  path,
  router,
  commentId
}
