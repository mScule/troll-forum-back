# Troll forum backend

## Technologies used

**TypeScript** as the language.\
**Dotenv** to support .env files.\
**Dotenv - Expand** to add variable composition support for .env files.

**Express** as server framework.\
**Cors - Express middleware** for easy cors configuration.\
**Express validator - Express middleware** for validating request values.

**BCrypt** for crypting stuff.

**Prisma** as ORM.\
**PostgreSQL** as the database.

## How to start stuff

| Command           | What it does                       |
|-------------------|------------------------------------|
| `yarn dev-server` | Run server in interactive dev mode |
| `yarn dev-db`     | Start the dev database             |

*To close the dev server or the dev server database, hit **CTRL** + **C***

## .ENV boilerplace

```conf
# DB
DB_USER="string"
DB_PASSWORD="string"
DB_HOST="localhost"
DB_PORT="5432"
DB_DB="string"
DB_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DB}?schema=public"

# Server
SERVER_PORT="3001"
SERVER_HOST="localhost"

# Crypting
CRYPTING_SALT_ROUNDS="number"
CRYPTING_JWT_SECRET="string"

```
