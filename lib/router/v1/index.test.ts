import { describe, expect, test } from "@jest/globals"

import auth from "./auth"
import comment from "./comment"
import post from "./post"
import reaction from "./reaction"
import user from "./user"

describe("API v1 routes point to the right routers", () => {
  test("auth routes", () => {
    expect(auth.path).toBe("/auth")
  })
  test("user routes", () => {
    expect(user.path).toBe("/user")
    expect(user.userId.path).toBe("/user/:userId")
    expect(user.userId.post.path).toBe("/user/:userId/post")
    expect(user.userId.comment.path).toBe("/user/:userId/comment")
    expect(user.userId.reaction.path).toBe("/user/:userId/reaction")
  })
  test("post routes", () => {
    expect(post.path).toBe("/post")
    expect(post.postId.path).toBe("/post/:postId")
    expect(post.postId.comment.path).toBe("/post/:postId/comment")
    expect(post.postId.reaction.path).toBe("/post/:postId/reaction")
  })
  test("comment routes", () => {
    expect(comment.path).toBe("/comment")
    expect(comment.commentId.path).toBe("/comment/:commentId")
    expect(comment.commentId.comment.path).toBe("/comment/:commentId/comment")
    expect(comment.commentId.reaction.path).toBe("/comment/:commentId/reaction")
  })
  test("reaction routes", () => {
    expect(reaction.path).toBe("/reaction")
    expect(reaction.reactionId.path).toBe("/reaction/:reactionId")
  })
})
