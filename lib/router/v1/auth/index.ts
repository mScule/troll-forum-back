import { Router } from "express"
import { body } from "express-validator"
import authenticate from "../../../middleware/authenticate"
import handleValidationErrors from "../../../middleware/generic-validation-error"
import handlers from "./handler"

const router = Router()
const path = "/auth"

router
  .route(path)
  .get(authenticate.asAny, handlers.get)
  .post(
    body("username").isEmail(),
    body("password").isString().isLength({ min: 4 }),
    handleValidationErrors,
    handlers.post
  )

export default {
  path,
  router
}
