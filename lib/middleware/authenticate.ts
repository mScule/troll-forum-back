import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import getUserId from "../express/get-user-id"
import notFound from "../express/not-found"
import prisma from "../setup/prisma"
import AuthenticatedRequest from "../types/authenticated-request"
const { CRYPTING_JWT_SECRET } = process.env

interface AccessTokenPayload {
  id: string
}

const unauthorized = (res: Response) => {
  res.status(401).send(`${res.statusCode} Unauthorized`)
}

const asAny = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthenticatedRequest

  const accessToken = authReq.headers.authorization
    ? authReq.headers.authorization
    : null

  let decodedToken: jwt.JwtPayload | null

  try {
    decodedToken = jwt.verify(
      accessToken + "",
      CRYPTING_JWT_SECRET + ""
    ) as unknown as AccessTokenPayload
  } catch {
    decodedToken = null
  }

  if (!decodedToken) {
    unauthorized(res)
    return false
  }

  authReq.user = { id: Number.parseInt(decodedToken.data.id) }

  next()
}

const asAuthor = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthenticatedRequest

  const accessToken = authReq.headers.authorization
    ? authReq.headers.authorization
    : null

  let decodedToken: jwt.JwtPayload | null

  try {
    decodedToken = jwt.verify(
      accessToken + "",
      CRYPTING_JWT_SECRET + ""
    ) as unknown as AccessTokenPayload
  } catch {
    decodedToken = null
  }

  if (!decodedToken) {
    unauthorized(res)
    return
  }

  authReq.user = { id: Number.parseInt(decodedToken.data.id) }

  const toIntOrNull = (value: string | undefined) =>
    value ? Number.parseInt(value) : null

  const userId = getUserId(authReq)
  const authorId = toIntOrNull(authReq.params.userId)
  const postId = toIntOrNull(authReq.params.postId)
  const commentId = toIntOrNull(authReq.params.commentId)
  const reactionId = toIntOrNull(authReq.params.reactionId)

  await prisma(async client => {
    if (authorId && authorId === userId) {

      next()
      return
    }

    if (postId) {

      const post = await client.post.findUnique({
        where: { id: postId }
      })

      if (!post) {
        notFound(res)
        return
      }



      if (userId === post.authorId) {
        next()
        return
      }
    }

    if (commentId) {
      const comment = await client.comment.findUnique({
        where: { id: commentId }
      })

      if (!comment) {
        notFound(res)
        return
      }

      if (userId === comment.authorId) {
        next()
        return
      }
    }

    if (reactionId) {
      const reaction = await client.reaction.findUnique({
        where: { id: reactionId }
      })

      if (!reaction) {
        notFound(res)
        return
      }

      if (userId === reaction.userId) {
        next()
        return
      }
    }

    unauthorized(res)
    return
  })
}

export default {
  asAny,
  asAuthor
}
