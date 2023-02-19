import { PrismaClient } from "@prisma/client"

const instance = new PrismaClient()

async function prisma(queries: (client: PrismaClient) => Promise<void>) {
  await instance.$connect()
  await queries(instance)
    .then()
    .catch(async e => console.error(e))
    .finally(async () => await instance.$disconnect())
}

export default prisma
