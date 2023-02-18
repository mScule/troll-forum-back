import { Request } from "express"
import AuthenticatedRequest from "../types/authenticated-request"

function getUserId(req: Request) {
  const authReq = req as AuthenticatedRequest
  return authReq.user.id
}

export default getUserId
