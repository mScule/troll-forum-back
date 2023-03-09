# Trolf - Backend

Backend for "Trolf" Trolling forum.

## First time?

See: [Project setup guide](./doc/setup-guide/guide.md)

## Commands

*Remember to check that the Docker is running*

| Command                                | Functionality                        |
| -------------------------------------- | ------------------------------------ |
| `yarn dev`                             | Run server in interactive dev mode   |
| `yarn db`                              | Start the dev database               |
| `yarn jest`                            | Run unit tests                       |
| `npx prisma migrate dev`               | Update db to follow the schema       |
| `npx prisma migrate dev --name <name>` | Create new migration with given name |

*To terminate any of the commands, hit **CTRL** + **C***

## Api versions

See different supported api router versions below:

[Version 1](./doc/api-versions/v1.md)
