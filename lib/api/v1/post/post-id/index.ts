import { Router } from "express"
import handler from "./handler"
import authenticate from "../../../../middleware/authenticate"

import comment from "./comment"
import reaction from "./reaction"

const router = Router()
const path = "/post/:postId"

router.route(path).get(handler.get).patch(authenticate.asAuthor, handler.patch)

export default {
  path,
  router,
  comment,
  reaction
}
