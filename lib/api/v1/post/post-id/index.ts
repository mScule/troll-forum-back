import { Router } from "express"
import handler from "./handler"
import { param } from "express-validator"
import handleValidationErrors from "../../../../middleware/generic-validation-error"
import authenticate from "../../../../middleware/authenticate"

import comment from "./comment"
import reaction from "./reaction"

const router = Router()
const path = "/post/:postId"

router
  .route(path)
  .get(param("postId").toInt().isInt(), handleValidationErrors, handler.get)
  .patch(
    param("postId").toInt().isInt(),
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
