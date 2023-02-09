import { Router, Response, NextFunction } from "express"
import AuthenticatedRequest from "../types/authenticated-request"
import jwt from "jsonwebtoken"
const { CRYPTING_JWT_SECRET } = process.env

const router = Router()

router.use((req, res, next) => {
  const authorizationHeader = req.headers.authorization
    ? req.headers.authorization
    : null

  const accessToken =
    (authorizationHeader + "").includes("accessToken") &&
    (authorizationHeader + "").includes(" ")
      ? authorizationHeader?.split(" ")[1]
      : null

  const decodedToken = jwt.verify(accessToken + "", CRYPTING_JWT_SECRET + "")

  if (!decodedToken) {
    res.status(401)
    res.send(`${res.statusCode} Unauthorized`)
    return
  }

  console.log(decodedToken)

  next()
})

export default router
