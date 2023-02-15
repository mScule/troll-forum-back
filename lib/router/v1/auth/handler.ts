import { Request, Response } from "express"
import prisma from "../../../setup/prisma"
import { compare } from "bcrypt"
import asLowerCase from "../../../string/as-lower-case"
import jwt from "jsonwebtoken"

const { CRYPTING_JWT_SECRET } = process.env

function signIn(req: Request, res: Response) {
  const username = asLowerCase(req.body.email)
  const password = req.body.password

  prisma(async client => {
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
    const exp = Math.floor(Date.now() / 1000 + 60 * 60)

    const token = jwt.sign({ data, exp }, CRYPTING_JWT_SECRET + "")

    res.status(200).json({ token })
    return
  })
}


function checkSignInStatus(req: Request, res: Response) {
  res.status(200).send("User is signed in")
}

export default {
  signIn,
  checkSignInStatus
}
