import { Request, Response } from "express"
import prisma from "../../../../../setup/prisma"

const get = async (req: Request, res: Response) => {
  const userId = Number.parseInt(req.params.userId)

  await prisma(async client => {
    const reactions = await client.reaction.findMany({ where: { userId } })
    res.status(200).send({ reactions })
  })
}

export default {
  get
}
