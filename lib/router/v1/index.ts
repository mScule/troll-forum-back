import { Router } from "express"

import auth from "./auth"
import user from "./user"
import post from "./post"
import comment from "./comment"
import reaction from "./reaction"

const router = Router()

// Authorization
router.use(auth.router)

// User
router.use(user.router)
router.use(user.userId.router)
router.use(user.userId.post.router)
router.use(user.userId.comment.router)
router.use(user.userId.reaction.router)

// Post
router.use(post.router)
router.use(post.postId.router)
router.use(post.postId.comment.router)
router.use(post.postId.reaction.router)

// Comment
router.use(comment.router)
router.use(comment.commentId.router)
router.use(comment.commentId.comment.router)
router.use(comment.commentId.reaction.router)

// Reaction
router.use(reaction.router)
router.use(reaction.reactionId.router)

export default {
  router
}
