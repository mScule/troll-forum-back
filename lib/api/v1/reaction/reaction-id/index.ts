import { Router } from "express"
import handler from "./handler"
import authenticate from "../../../../middleware/authenticate"

const router = Router()
const path = "/reaction/:reactionId"

router
  .route(path)
  .get(handler.get)
  .patch(authenticate.asAuthor, handler.patch)
  .delete(authenticate.asAuthor, handler.del)

export default {
  path,
  router
}
