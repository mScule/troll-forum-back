import { Router } from "express"
import handler from "./handler"
import authenticate from "../../../../../middleware/authenticate"

const router = Router()
const path = "/post/:postId/comment"

router.route(path).get(handler.get).post(authenticate.asAny, handler.post)

export default {
  path,
  router
}
