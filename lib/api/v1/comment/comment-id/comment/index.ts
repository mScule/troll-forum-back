import { Router } from "express"
import { param, body } from "express-validator"
import handler from "./handler"
import authenticate from "../../../../../middleware/authenticate"
import handleValidationErrors from "../../../../../middleware/generic-validation-error"
import isContentful from "../../../../../string/is-contentful"

const router = Router()
const path = "/comment/:commentId/comment"

router
  .route(path)
  .get(param("commentId").toInt().isInt(), handleValidationErrors, handler.get)
  .post(
    param("commentId").toInt().isInt(),
    body("body")
      .isString()
      .custom(value => isContentful(value)),
    authenticate.asAny,
    handler.post
  )

export default {
  path,
  router
}
