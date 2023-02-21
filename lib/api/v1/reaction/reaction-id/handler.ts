import { Request, Response } from "express"
import prisma from "../../../../setup/prisma"
import getUserId from "../../../../express/get-user-id"
import notFound from "../../../../express/not-found"

const get = async (req: Request, res: Response) => {
  const reactionId = Number.parseInt(req.params.reactionId)

  await prisma(async client => {
    const reaction = await client.reaction.findUnique({
      where: { id: reactionId }
    })

    if (!reaction) {
      notFound(res)
      return
    }

    res.status(200).send({ reaction })
  })
}

const patch = async (req: Request, res: Response) => {
  const reactionId = Number.parseInt(req.params.reactionId)
  const type = req.body.type

  await prisma(async client => {
    const reaction = await client.reaction.update({
      where: { id: reactionId },
      data: {
        type
      }
    })

    res.status(204).send({ reaction })
  })
}

const del = async (req: Request, res: Response) => {
  const reactionId = Number.parseInt(req.params.reactionId)

  await prisma(async client => {
    const reaction = await client.reaction.delete({ where: { id: reactionId } })

    res.status(204).send(reaction)
  })
}

export default {
  get,
  patch,
  del
}
