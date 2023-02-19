import { Request, Response } from "express"
import getUserId from "../../../../../express/get-user-id"
import notFound from "../../../../../express/not-found"
import prisma from "../../../../../setup/prisma"

const get = async (req: Request, res: Response) => {
  const postId = Number.parseInt(req.params.postId)

  await prisma(async client => {
    const post = await client.post.findUnique({ where: { id: postId } })
    if (!post) {
      notFound(res)
      return
    }

    const reactions = await client.reaction.findMany({ where: { id: postId } })
    res.status(200).send({ reactions })
  })
}

const post = async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const postId = Number.parseInt(req.params.postId)
  const type = req.body.type

  await prisma(async client => {
    const post = await client.post.findUnique({ where: { id: postId } })
    if (!post) {
      notFound(res)
      return
    }

    const reaction = await client.reaction.create({
      data: {
        userId,
        postId,
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
