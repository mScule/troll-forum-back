import { Router } from "express"

const router = Router()
const path = "/post/:postId/reaction"

router.route(path).get((req, res) => {
  res.send(`/post/${req.params.postId}/reaction`)
})

export default {
  path,
  router,
}
