import { Router } from "express"
import { param, body } from "express-validator"
import handler from "./handler"
import authenticate from "../../../../middleware/authenticate"
import isReactionType from "../../../../string/is-reaction-type.ts"

const router = Router()
const path = "/reaction/:reactionId"

router
  .route(path)
  .get(param("reactionId").toInt().isInt(), handler.get)
  .patch(
    param("reactionId").toInt().isInt(),
    body("type").custom(value => isReactionType(value)),
    authenticate.asAuthor,
    handler.patch
  )
  .delete(
    param("reactionId").toInt().isInt(),
    authenticate.asAuthor,
    handler.del
  )

export default {
  path,
  router
}
