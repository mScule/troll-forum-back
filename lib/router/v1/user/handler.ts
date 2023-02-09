import { Request, Response } from "express"
import prisma from "../../../setup/prisma"
import { hash } from "../../../setup/crypting"
import asLowerCase from "../../../string/as-lower-case"

export function signUp(req: Request, res: Response) {
  const email = asLowerCase(req.body.email)

  prisma(async client => {
    const emailExists = await client.user.findUnique({
      where: {
        email
      }
    })

    if (emailExists) {
      res.status(409).send("Acconut with given email address already exists")
      return
    }

    const createdUser = await client.user.create({
      data: {
        email,
        password: hash(req.body.password)
      }
    })

    res.status(201).send(createdUser)
  })
}

export function get(req: Request, res: Response) {
  res.send("User")
}

export default {
  signUp,
  get
}
