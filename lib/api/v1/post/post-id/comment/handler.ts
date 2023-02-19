import { Request, Response } from "express"
import prisma from "../../../../../setup/prisma"
import notFound from "../../../../../express/not-found"
import getUserId from "../../../../../express/get-user-id"

const get = async (req: Request, res: Response) => {
  const postId = Number.parseInt(req.params.postId)

  await prisma(async client => {
    const comments = await client.comment.findMany({ where: { postId } })

    if (!comments) {
      notFound(res)
      return
    }

    res.status(200).send({ comments })
  })
}

const post = async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const postId = Number.parseInt(req.params.postId)
  const body = req.body.body

  await prisma(async client => {
    const post = await client.post.findUnique({ where: { id: postId } })
    if (!post) {
      notFound(res)
      return
    }

    const comment = await client.comment.create({
      data: {
        authorId: userId,
        postId,
        body
      }
    })

    res.status(201).send({ comment })
  })
}

export default {
  get,
  post
}
