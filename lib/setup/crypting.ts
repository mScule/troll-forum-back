import bcrypt from "bcrypt"
const { CRYTPING_SALT_ROUNDS } = process.env

export function hash(data: string): string {
  return bcrypt.hashSync(data, Number.parseInt(CRYTPING_SALT_ROUNDS + ""))
}

export function compare(data: string, encrypted: string): boolean {
  return bcrypt.compareSync(data, encrypted)
}

export default {
  hash,
  compare
}
