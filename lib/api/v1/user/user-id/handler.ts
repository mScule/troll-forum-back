import { Request, Response } from "express"
import prisma from "../../../../setup/prisma"
import exclude from "../../../../prisma/exclude"
import crypting from "../../../../setup/crypting"
import getUserId from "../../../../express/get-user-id"

const get = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)

  await prisma(async client => {
    const user = await client.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      res.status(404).send("User not found")
      return
    }

    res.status(200).send({ user: exclude(user, ["password"]) })
  })
}

const patch = async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const password = crypting.hash(req.body.password)

  await prisma(async client => {
    const user = await client.user.update({
      data: { password },
      where: { id: userId }
    })

    res.status(200).send({ user: exclude(user, ["password"]) })
  })
}

export default {
  get,
  patch
}
