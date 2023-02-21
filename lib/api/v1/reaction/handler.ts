import { Request, Response } from "express"
import prisma from "../../../setup/prisma"

const get = async (req: Request, res: Response) => {
  await prisma(async client => {
    const reactions = await client.reaction.findMany()
    res.status(200).send({ reactions })
  })
}

export default {
  get
}
