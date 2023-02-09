import { Router } from "express"
import { body } from "express-validator"
import authenticationRequired from "../../../middleware/authentication"
import handleValidationErrors from "../../../middleware/generic-validation-error"
import handlers from "./handler"

const router = Router()

router
  .route("/")
  .post(
    body("email").isEmail(),
    body("password").isString().isLength({ min: 4 }),
    handleValidationErrors,
    handlers.signUp
  )
  .get(authenticationRequired, handlers.get)

export default router
