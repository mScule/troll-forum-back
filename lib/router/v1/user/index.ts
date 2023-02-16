import { Router } from "express"
import handler from "./handler"

import userId from "./user-id"

const router = Router()
const path = "/user"

router.route(path).get(handler.get).post(handler.post)

export default {
  path,
  router,
  userId
}
