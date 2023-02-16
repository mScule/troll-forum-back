import { Router } from "express"
import handler from "./handler"
import authenticate from "../../../../middleware/authenticate"

import post from "./post"
import comment from "./comment"
import reaction from "./reaction"

const router = Router()
const path = "/user/:userId"

router.route(path).get(handler.get).patch(authenticate.asAuthor, handler.patch)

export default {
  path,
  router,
  post,
  comment,
  reaction
}
