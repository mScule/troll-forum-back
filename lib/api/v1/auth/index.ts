import { Router } from "express"
import { body } from "express-validator"
import handleValidationErrors from "../../../middleware/generic-validation-error"
import authenticate from "../../../middleware/authenticate"
import handlers from "./handler"

const router = Router()
const path = "/auth"

router
  .route(path)
  .get(authenticate.asAny, handlers.get)
  .post(
    body("username").isString().isLength({ min: 3 }),
    body("password").isString().isLength({ min: 12 }),
    handleValidationErrors,
    handlers.post
  )

export default {
  path,
  router
}
