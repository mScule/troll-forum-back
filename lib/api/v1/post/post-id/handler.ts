import { Request, Response } from "express"
import notFound from "../../../../express/not-found"
import prisma from "../../../../setup/prisma"

const get = async (req: Request, res: Response) => {
  const postId = Number.parseInt(req.params.postId)
  await prisma(async client => {
    const post = await client.post.findUnique({ where: { id: postId } })

    if (!post) {
      notFound(res)
      return
    }

    res.status(200).send({ post })
  })
}

const patch = async (req: Request, res: Response) => {
  const postId = Number.parseInt(req.params.postId)
  const title = req.body.title
  const body = req.body.body

  let updated: { title?: string; body?: string } = {}

  if (title) {
    updated.title = title
  }

  if (body) {
    updated.body = body
  }

  await prisma(async client => {
    const post = await client.post.update({
      where: { id: postId },
      data: updated
    })
    res.status(201).send({ post })
  })
}

export default {
  get,
  patch
}
