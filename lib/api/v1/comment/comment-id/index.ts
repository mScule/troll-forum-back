import { Router } from "express"
import { body, param } from "express-validator"
import handler from "./handler"
import authenticate from "../../../../middleware/authenticate"
import handleValidationErrors from "../../../../middleware/generic-validation-error"

import comment from "./comment"
import reaction from "./reaction"
import isContentful from "../../../../string/is-contentful"

const router = Router()
const path = "/comment/:commentId"

router
  .route(path)
  .get(param("commentId").toInt().isInt(), handleValidationErrors, handler.get)
  .patch(
    param("commentId").toInt().isInt(),
    body("body")
      .isString()
      .custom(value => isContentful(value)),
    handleValidationErrors,
    authenticate.asAuthor,
    handler.patch
  )

export default {
  path,
  router,
  comment,
  reaction
}
