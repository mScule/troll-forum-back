import { describe, expect, test } from "@jest/globals"

import isContentful from "./is-contentful"

describe("isContentful utility works as intended", () => {
  test("Function is given undefined value", () => {
    expect(isContentful(undefined)).toBe(false)
  })
  test("Function is given empty string", () => {
    expect(isContentful("")).toBe(false)
  })
  test("Function is given string containing only tabs and spaces", () => {
    expect(isContentful("  \t  \t  ")).toBe(false)
  })
  test("Function is given string containing spaces and visible characters", () => {
    expect(isContentful(" hello  \t  there")).toBe(true)
  })
})
