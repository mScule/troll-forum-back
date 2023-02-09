import { Router } from "express"

import authenticationNeeded from "../../middleware/authentication"

import authRouter from "./auth"
import eventRouter from "./event"
import userRouter from "./user"

const router = Router()

router
  .use("/auth", authRouter)
  .use("/user", userRouter)
  .use("/event", authenticationNeeded, eventRouter)

export default router
