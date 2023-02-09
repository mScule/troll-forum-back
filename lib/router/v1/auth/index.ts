import { Router } from "express"
import { body } from "express-validator"
import authencticationNeeded from "../../../middleware/authentication"
import handleValidationErrors from "../../../middleware/generic-validation-error"
import handlers from "./handler"

const router = Router()

router
  .route("/signIn")
  .get(
    authencticationNeeded,
    handlers.checkSignInStatus
  )
  .post(
    body("email").isEmail(),
    body("password").isString().isLength({ min: 4 }),
    handleValidationErrors,
    handlers.signIn
  )

export default router
