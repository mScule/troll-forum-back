import { Router } from "express"

const router = Router()
const path = "/user/:userId/post"

router.route(path).get((req, res) => {
  res.send(`/user/${req.params.userId}/post`)
})

export default {
  path,
  router
}
