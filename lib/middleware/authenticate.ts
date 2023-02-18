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

const authorize = (req: Request, res: Response) => {
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
}

const asAny = async (req: Request, res: Response, next: NextFunction) => {
  authorize(req, res)
  next()
}

const asAuthor = async (req: Request, res: Response, next: NextFunction) => {
  authorize(req, res)

  const toIntOrNull = (value: string | undefined) =>
    value ? Number.parseInt(value) : null

  const userId = getUserId(req)

  const authorId = toIntOrNull(req.params.userId)
  const postId = toIntOrNull(req.params.postId)
  const commentId = toIntOrNull(req.params.commentId)
  const reactionId = toIntOrNull(req.params.reactionId)

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
  })
}

export default {
  asAny,
  asAuthor
}
