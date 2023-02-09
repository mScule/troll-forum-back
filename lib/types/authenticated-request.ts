interface AuthenticatedRequest extends Request {
  user: { id: number }
}

export default AuthenticatedRequest
