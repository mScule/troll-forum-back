import { Router } from "express"
import { param } from "express-validator"
import handleValidationErrors from "../../../../../middleware/generic-validation-error"
import handler from "./handler"

const router = Router()
const path = "/user/:userId/reaction"

router
  .route(path)
  .get(param("userId").toInt().isInt(), handleValidationErrors, handler.get)

export default {
  path,
  router
}
