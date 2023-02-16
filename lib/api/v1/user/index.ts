import { Router } from "express"
import { body } from "express-validator"
import handleValicationErrors from "../../../middleware/generic-validation-error"
import handler from "./handler"

import userId from "./user-id"

const router = Router()
const path = "/user"

router
  .route(path)
  .get(handler.get)
  .post(
    body("username").isString().isLength({ min: 3 }),
    body("password").isString().isLength({ min: 12 }),
    handleValicationErrors,
    handler.post
  )

export default {
  path,
  router,
  userId
}
