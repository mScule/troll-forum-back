import { Router } from "express"
import handler from "./handler"

import commentId from "./comment-id"

const router = Router()
const path = "/comment"

router.route(path).get(handler.get)

export default {
  path,
  router,
  commentId
}
