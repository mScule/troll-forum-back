import { Router } from "express"
import handler from "./handler"
import { param, body } from "express-validator"
import authenticate from "../../../../../middleware/authenticate"
import isReactionType from "../../../../../string/is-reaction-type.ts"
import handleValidationErrors from "../../../../../middleware/generic-validation-error"

const router = Router()
const path = "/comment/:commentId/reaction"

router
  .route(path)
  .get(param("commentId").toInt().isInt(), handleValidationErrors, handler.get)
  .post(
    param("commentId").toInt().isInt(),
    body("type").custom(value => isReactionType(value)),
    handleValidationErrors,
    authenticate.asAny,
    handler.post
  )

export default {
  path,
  router
}
