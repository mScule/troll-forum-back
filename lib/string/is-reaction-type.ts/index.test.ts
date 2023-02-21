import { describe, expect, test } from "@jest/globals"
import isReactionType from "."

describe("isReactionType is working as intended", () => {
  test("Function is given undefined value", () => {
    expect(isReactionType(undefined)).toBe(false)
  })
  test("Function is given wrong value", () => {
    expect(isReactionType("Hello there")).toBe(false)
  })
  test("Function is given type DULL", () => {
    expect(isReactionType("DULL")).toBe(true)
  })
  test("Function is given type SPAM", () => {
    expect(isReactionType("SPAM")).toBe(true)
  })
  test("Function is given type TROLL", () => {
    expect(isReactionType("TROLL")).toBe(true)
  })
})
