import { Request, Response } from "express"
import prisma from "../../../setup/prisma"

const get = async (_req: Request, res: Response) => {
  await prisma(async client => {
    const comments = await client.comment.findMany()
    res.status(200).send({ comments })
  })
}

export default {
  get
}
