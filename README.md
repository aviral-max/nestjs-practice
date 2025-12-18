# NestJS – Practice

This project is a practice setup using **NestJS**, **Prisma**, and **Docker**.
A local development database runs inside a Docker container and is managed using npm scripts.

---

## Development Database & Prisma Scripts

The following npm scripts are used to manage the local development database
and apply Prisma migrations.

---

### `prisma:dev:deploy`

Applies existing Prisma migrations to the development database.

**What this script does:**
- Runs `prisma migrate deploy`
- Applies all already-created migration files
- Updates the database schema to match `schema.prisma`
- Does not create new migrations

**Command:**
```bash
npm run prisma:dev:deploy
```

### `db:dev:up`

Starts the development database container using Docker Compose.

**What this script does:**
- Runs `docker compose up dev-db -d`
- Starts the `dev-db` service defined in `docker-compose.yml`
- Runs the container in detached `-d` (background) mode

**Command:**
```bash
npm run db:dev:up
```

### `db:dev:rm`

Stops and completely removes the development database container.

**What this script does:**
- Runs `docker compose rm dev-db -f -s -v`
- Stops the container if it is running `-s`
- Force removes the container without confirmation `-f`
- Deletes attached Docker volumes (database data) `-v`

**Command:**
```bash
npm run db:dev:rm
```

### `db:dev:restart`

Resets the development database and reapplies Prisma migrations.

**What this script does:**
- Removes the existing development database container and volumes
- Starts a fresh development database container
- Waits briefly for the database to be ready
- Applies Prisma migrations to the new database

**This script internally runs:**
- db:dev:rm
- db:dev:up
- prisma:dev:deploy

**Command:**
```bash
npm run db:dev:restart
```
