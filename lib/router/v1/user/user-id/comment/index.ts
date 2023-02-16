import { Router } from "express"
import handler from "./handler"

const router = Router()
const path = "/user/:userId/comment"

router.route(path).get(handler.get)

export default {
  path,
  router
}
