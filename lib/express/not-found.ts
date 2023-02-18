import { Response } from "express"

export default function notFound(res: Response) {
  res.status(404).send(`${res.statusCode} Not found`)
}
