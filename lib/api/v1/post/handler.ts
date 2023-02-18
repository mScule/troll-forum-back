import { Request, Response } from "express"
import getUserId from "../../../express/get-user-id"
import prisma from "../../../setup/prisma"

const get = async (req: Request, res: Response) => {
  await prisma(async client => {
    const posts = await client.post.findMany()
    res.status(201).send({ posts })
  })
}
const post = async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const title = req.body.title
  const body = req.body.body
  const date = new Date()

  await prisma(async client => {
    const post = await client.post.create({
      data: {
        authorId: userId,
        title,
        body,
        date
      }
    })

    res.status(201).send({ post })
  })
}

export default {
  get,
  post
}
