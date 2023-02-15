import { Router } from "express"

const router = Router()
const path = "/comment/:commentId/reaction"

router.route(path).get((req, res) => {
  res.send(`/comment/${req.params.commentId}/reaction`)
})

export default {
  path,
  router
}
