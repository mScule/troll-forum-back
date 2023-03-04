import { ReactionType } from "@prisma/client"
import { Request, Response } from "express"
import prisma from "../../../setup/prisma"

const get = async (_req: Request, res: Response, type: ReactionType) => {
  await prisma(async client => {
    const result = {
      posts: await client.$queryRaw`
        SELECT
          "Post"."id",
          "Post"."title",
          "Post"."date",
          "Post"."authorId",
          COUNT("Reaction"."id") AS "reactionCount"
        FROM
          "Post"
          LEFT JOIN "Reaction" ON "Post".id = "Reaction"."postId"

        WHERE "Reaction"."type"::text = ${type}

        GROUP BY "Post"."id"
        ORDER BY "reactionCount" DESC
        LIMIT 3;
      `,

      comments: await client.$queryRaw`
      SELECT
        "Comment"."id",
        "Comment"."body",
        "Comment"."authorId",
        COUNT("Reaction"."id") AS "reactionCount"
      FROM
        "Comment"
        LEFT JOIN "Reaction" ON "Comment".id = "Reaction"."commentId"

      WHERE "Reaction"."type"::text = ${type}

      GROUP BY "Comment"."id"
      ORDER BY "reactionCount" DESC
      LIMIT 3;
    `
    }

    res.send(
      JSON.stringify({ ...result }, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    )
  })
}

export default { get }
