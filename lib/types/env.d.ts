declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string
      DB_PASSWORD: string
      DB_HOST: string
      DB_PORT: string
      DB_DB: string
      DB_URL: string

      SERVER_PORT: string
      SERVER_HOST: string

      CRYPTING_SALT_ROUNDS: string
      CRYPTING_JWT_TOKEN_SECRET: string
    }
  }
}

export default global
