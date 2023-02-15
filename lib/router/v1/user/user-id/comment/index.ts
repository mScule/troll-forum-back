import { Router } from "express"

const router = Router()
const path = "/user/:userId/comment"

router.route(path).get((req, res) => {
  res.send(`/user/${req.params.userId}/comment`)
})

export default {
  path,
  router
}
