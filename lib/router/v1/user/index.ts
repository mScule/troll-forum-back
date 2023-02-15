import { Router } from "express"

import userId from "./user-id"

const router = Router()
const path = "/user"

router.route(path).get((req, res) => {
  res.send(`/user`)
})

export default {
  path,
  router,
  userId
}
