import { Router } from "express"

const router = Router()
const path = "/user/:userId/reaction"

router.route(path).get((req, res) => {
  res.send(`/user/${req.params.userId}/reaction`)
})

export default {
  path,
  router
}
