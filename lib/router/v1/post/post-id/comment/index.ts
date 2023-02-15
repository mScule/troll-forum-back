import { Router } from "express"

const router = Router()
const path = "/post/:postId/comment"

router.route(path).get((req, res) => {
  res.send(`/post/${req.params.postId}/comment`)
})

export default {
  path,
  router
}
