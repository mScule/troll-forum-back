import { Router } from "express"
import { param, body } from "express-validator"
import handler from "./handler"
import authenticate from "../../../../../middleware/authenticate"
import handleValidationErrors from "../../../../../middleware/generic-validation-error"
import isContentful from "../../../../../string/is-contentful"

const router = Router()
const path = "/post/:postId/comment"

router
  .route(path)
  .get(param("postId").toInt().isInt(), handleValidationErrors, handler.get)
  .post(
    param("postId").toInt().isInt(),
    body("body")
      .isString()
      .custom(value => isContentful(value)),
    handleValidationErrors,
    authenticate.asAny,
    handler.post
  )

export default {
  path,
  router
}
