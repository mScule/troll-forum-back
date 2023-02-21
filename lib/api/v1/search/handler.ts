import { Request, Response } from "express"
import prisma from "../../../setup/prisma"
import exclude from "../../../prisma/exclude"

const get = async (req: Request, res: Response) => {
  const searchValue = req.query.value + ""

  await prisma(async client => {
    const users = (
      await client.user.findMany({
        where: {
          username: { contains: searchValue, mode: "insensitive" }
        }
      })
    ).map(user => exclude(user, ["password"]))

    console.log("USERS:", users)

    const posts = await client.post.findMany({
      where: {
        title: { contains: searchValue, mode: "insensitive" }
      }
    })

    const comments = await client.comment.findMany({
      where: {
        body: { contains: searchValue, mode: "insensitive" }
      }
    })

    res.status(200).send({ users, posts, comments })
  })
}

export default {
  get
}
