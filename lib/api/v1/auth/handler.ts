import { Request, Response } from "express"
import prisma from "../../../setup/prisma"
import { compare } from "bcrypt"
import asLowerCase from "../../../string/as-lower-case"
import jwt from "jsonwebtoken"
import milliseconds from "../../../time/milliseconds"

const { CRYPTING_JWT_SECRET } = process.env

const post = async (req: Request, res: Response) => {
  const username = asLowerCase(req.body.username)
  const password = req.body.password

  await prisma(async client => {
    const user = await client.user.findUnique({
      where: {
        username
      }
    })

    if (!user) {
      res.status(404).send(`User doesn't exist for email ${username}`)
      return
    }

    if (!(await compare(password, user.password))) {
      res.status(401).send(`Password is wrong for user ${username}`)
      return
    }

    const data = { id: user.id }
    const exp = Math.floor(Date.now() + milliseconds.fromDays(1))

    const token = jwt.sign({ data, exp }, CRYPTING_JWT_SECRET + "")

    res.status(200).json({ token })
    return
  })
}


function get(_req: Request, res: Response) {
  res.status(200).send("User is signed in")
}

export default {
  get,
  post
}
