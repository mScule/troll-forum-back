import { Router } from "express"
import jwt from "jsonwebtoken"
import prisma from "../setup/prisma"
const { CRYPTING_JWT_SECRET } = process.env

const asAny = Router()
asAny.use((req, res, next) => {
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

  next()
})

const asAuthor = Router()

asAuthor.use(async(req, res, next) => {
  const userId = req.params.userId
  const postId = req.params.postId
  const commentId = req.params.commentId
  const reactionId = req.params.reactionId

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

  next()
})

export default {
  asAny,
  asAuthor
}
