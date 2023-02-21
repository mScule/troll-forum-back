import { Router } from "express"
import { param, body } from "express-validator"
import handleValidationErrors from "../../../../../middleware/generic-validation-error"
import handler from "./handler"
import authenticate from "../../../../../middleware/authenticate"
import isReactionType from "../../../../../string/is-reaction-type.ts"

const router = Router()
const path = "/post/:postId/reaction"

router
  .route(path)
  .get(param("postId").toInt().isInt(), handleValidationErrors, handler.get)
  .post(
    param("postId").toInt().isInt(),
    body("type")
      .isString()
      .custom(value => isReactionType(value)),
    handleValidationErrors,
    authenticate.asAny,
    handler.post
  )

export default {
  path,
  router
}
