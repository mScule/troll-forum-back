import { Request, Response } from "express"
import prisma from "../../../../../setup/prisma"

const get = async (req: Request, res: Response) => {
  const userId = Number.parseInt(req.params.userId)

  await prisma(async client => {
    const comments = await client.comment.findMany({
      where: { authorId: userId }
    })
    res.status(200).send({ comments })
  })
}

export default {
  get
}
