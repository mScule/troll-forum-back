import { Router } from "express"

const router = Router()
const path = "/comment/:commentId/comment"

router.route(path).get((req, res) => {
  res.send(`/comment/${req.params.commentId}/comment`)
})

export default {
  path,
  router
}
