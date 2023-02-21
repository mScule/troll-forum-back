import { Request, Response } from "express"
import getUserId from "../../../../../express/get-user-id"
import notFound from "../../../../../express/not-found"
import prisma from "../../../../../setup/prisma"

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

    const replies = await client.comment.findMany({
      where: { replyId: commentId }
    })

    res.status(200).send({ replies })
  })
}
const post = async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const commentId = Number.parseInt(req.params.commentId)
  const body = req.body.body

  await prisma(async client => {
    const comment = await client.comment.findUnique({
      where: { id: commentId }
    })

    if (!comment) {
      notFound(res)
      return
    }

    const reply = await client.comment.create({
      data: {
        authorId: userId,
        replyId: commentId,
        body
      }
    })

    res.status(201).send(reply)
  })
}

export default {
  get,
  post
}
