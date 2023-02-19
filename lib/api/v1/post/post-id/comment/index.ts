import { Router } from "express"
import { param, body } from "express-validator"
import handler from "./handler"
import authenticate from "../../../../../middleware/authenticate"
import handleValidationErrors from "../../../../../middleware/generic-validation-error"

const router = Router()
const path = "/post/:postId/comment"

router
  .route(path)
  .get(param("postId"), handleValidationErrors, handler.get)
  .post(
    param("postId"),
    body("body"),
    handleValidationErrors,
    authenticate.asAny,
    handler.post
  )

export default {
  path,
  router
}
