import { Request, Response } from "express"
import prisma from "../../../../../setup/prisma"
import getUserId from "../../../../../express/get-user-id"
import notFound from "../../../../../express/not-found"

const get = async (req: Request, res: Response) => {
  const commentId = Number.parseInt(req.params.commentId)

  await prisma(async client => {
    const comment = await client.comment.findUnique({
      where: { id: commentId }
    })
    if (!comment) {
      notFound(res)
      return
    }

    const reactions = await client.reaction.findMany({ where: { commentId } })
    res.status(200).send({ reactions })
  })
}

const post = async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const commentId = Number.parseInt(req.params.commentId)
  const type = req.body.type

  await prisma(async client => {
    const comment = await client.comment.findUnique({
      where: { id: commentId }
    })
    if (!comment) {
      notFound(res)
      return
    }

    const reactionAlreadyExists = await client.reaction.findFirst({
      where: {
        userId,
        commentId
      }
    })

    if (reactionAlreadyExists) {
      res.status(304).send()
      return
    }

    const reaction = await client.reaction.create({
      data: {
        commentId,
        userId,
        type
      }
    })

    res.status(201).send({ reaction })
  })
}

export default {
  get,
  post
}
