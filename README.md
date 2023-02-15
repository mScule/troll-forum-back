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

## Commands

| Command                                | Functionality                        |
|----------------------------------------|--------------------------------------|
| `yarn dev`                             | Run server in interactive dev mode   |
| `yarn db`                              | Start the dev database               |
| `npx prisma migrate dev`               | Update db to follow the schema       |
| `npx prisma migrate dev --name <name>` | Create new migration with given name |

*To terminate any of the commands, hit **CTRL** + **C***

## Running dev server

### For the first time:
- Make sure that you have:
  Docker desktop,
  Node (18 or newer),
  NPM,
  Yarn.
- Make sure that the Docker desktop is up and running.
- Make sure that you have .env file created with following schema:
```conf
# DB
DB_USER=<STRING VALUE HERE>
DB_PASSWORD=<STRING VALUE HERE>
DB_HOST=<STRING VALUE HERE>
DB_PORT="5432"
DB_DB=<STRING VALUE HERE>
DB_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DB}?schema=public"

# Server
SERVER_PORT="3001"
SERVER_HOST=<STRING VALUE HERE>

# Crypting
CRYPTING_SALT_ROUNDS=<STRING VALUE HERE>
CRYPTING_JWT_SECRET=<STRING VALUE HERE>
```
- Make sure that the .env file variables are filled with correct data.
- Run `yarn install` to install all dependencies.
- Run `yarn db` to start the dev db.
- Run `npx prisma migrate dev` to populate the database with tables and stuff.

### If database container is stopped:
- Run `yarn db`

### Just to start the dev server:
- Run `yarn dev` to start the server
