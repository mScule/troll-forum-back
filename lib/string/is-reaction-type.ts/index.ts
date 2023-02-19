import { ReactionType } from "@prisma/client"

export default function isReactionType(value: string | undefined) {
  return (
    value &&
    (value === ReactionType.DULL ||
      value === ReactionType.SPAM ||
      value === ReactionType.TROLL)
  )
}
