import { Router } from "express"

import postId from "./post-id"

const router = Router()
const path = "/post"

router.route(path).get((req, res) => {
  res.send(`/post`)
})

export default {
  path,
  router,
  postId
}
