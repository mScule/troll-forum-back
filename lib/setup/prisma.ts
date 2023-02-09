import { PrismaClient } from "@prisma/client"

async function prisma(queries: (client: PrismaClient) => Promise<void>) {
  const prisma = new PrismaClient()

  await queries(prisma)
    .then()
    .catch(async e => {
      console.error(e)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}

export default prisma
