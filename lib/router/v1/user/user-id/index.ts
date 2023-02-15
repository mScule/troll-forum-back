import { Router } from "express"

import post from "./post"
import comment from "./comment"
import reaction from "./reaction"

const router = Router()
const path = "/user/:userId"

router.route(path).get((req, res) => {
  res.send(`/user/${req.params.userId}`)
})

export default {
  path,
  router,
  post,
  comment,
  reaction
}
