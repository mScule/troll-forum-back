import { Request } from "express"

interface AuthenticatedRequest extends Request {
  user: { id: number }
}

export default AuthenticatedRequest
