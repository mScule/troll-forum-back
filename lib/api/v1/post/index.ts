import { Router } from "express"
import handler from "./handler"
import authenticate from "../../../middleware/authenticate"

import postId from "./post-id"

const router = Router()
const path = "/post"

router.route(path).get(handler.get).post(authenticate.asAny, handler.post)

export default {
  path,
  router,
  postId
}
