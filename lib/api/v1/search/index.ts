import { Router } from "express"
import { query } from "express-validator"
import handleValidationErrors from "../../../middleware/generic-validation-error"
import isContentful from "../../../string/is-contentful"
import handler from "./handler"

const router = Router()
const path = "/search"

router.route(path).get(
  query("value").custom(value => isContentful(value)),
  handleValidationErrors,
  handler.get
)

export default {
  path,
  router
}
