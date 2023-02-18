import { Router } from "express"
import { body } from "express-validator"
import handler from "./handler"
import authenticate from "../../../middleware/authenticate"
import isContentful from "../../../string/is-contentful"
import handleValidationErrors from "../../../middleware/generic-validation-error"

import postId from "./post-id"

const router = Router()
const path = "/post"

router
  .route(path)
  .get(handler.get)
  .post(
    body("title")
      .isString()
      .custom(value => isContentful(value))
      .trim(),
    body("body")
      .isString()
      .custom(value => isContentful(value))
      .trim(),
    handleValidationErrors,
    authenticate.asAny,
    handler.post
  )

export default {
  path,
  router,
  postId
}
