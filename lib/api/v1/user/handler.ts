import { Request, Response } from "express"
import prisma from "../../../setup/prisma"
import crypting from "../../../setup/crypting"
import exclude from "../../../prisma/exclude"

const get = async (req: Request, res: Response) => {
  await prisma(async client => {
    const users = (await client.user.findMany()).map(user =>
      exclude(user, ["password"])
    )
    res.send(users)
  })
}

const post = async (req: Request, res: Response) => {
  const username = req.body.username
  const password = crypting.hash(req.body.password)

  await prisma(async client => {
    const userExists = await client.user.findUnique({ where: { username } })

    if (userExists) {
      res.status(409).send(`User already exists with username ${username}`)
      return
    }

    const user = await client.user.create({
      data: {
        username,
        password
      }
    })

    res.status(201).send({ users: exclude(user, ["password"]) })
  })
}

export default {
  get,
  post
}
