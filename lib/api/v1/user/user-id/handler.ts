import { Request, Response } from "express"
import prisma from "../../../../setup/prisma"
import exclude from "../../../../prisma/exclude"

const get = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)

  prisma(async client => {
    const user = await client.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      res.status(404).send("User not found")
      return
    }

    res.status(200).send(exclude(user, ["password"]))
  })
}

const patch = async (req: Request, res: Response) => {}

export default {
  get,
  patch
}
