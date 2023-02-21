import { Request, Response } from "express"
import getUserId from "../../../../express/get-user-id"
import notFound from "../../../../express/not-found"
import prisma from "../../../../setup/prisma"

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

    res.status(200).send({ comment })
  })
}

const patch = async (req: Request, res: Response) => {
  const commentId = Number.parseInt(req.params.commentId)
  const body = req.body.body

  await prisma(async client => {
    const comment = await client.comment.update({
      where: { id: commentId },
      data: { body }
    })

    res.status(200).send({ comment })
  })
}

export default {
  get,
  patch
}
