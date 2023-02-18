import { Router } from "express"
import { body, param } from "express-validator"
import handleValidationErrors from "../../../../middleware/generic-validation-error"
import handler from "./handler"
import authenticate from "../../../../middleware/authenticate"

import post from "./post"
import comment from "./comment"
import reaction from "./reaction"

const router = Router()
const path = "/user/:userId"

router
  .route(path)
  .get(param("userId").toInt().isInt(), handleValidationErrors, handler.get)
  .patch(
    param("userId").toInt().isInt(),
    body("password").isString().isLength({ min: 12 }),
    handleValidationErrors,
    authenticate.asAuthor,
    handler.patch
  )

export default {
  path,
  router,
  post,
  comment,
  reaction
}
