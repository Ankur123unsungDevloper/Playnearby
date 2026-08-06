import { PrismaClient } from "@prisma/client";

// Standard singleton pattern so hot-reload during dev (tsx watch) doesn't spin
// up a fresh PrismaClient — and a new DB connection pool — on every file save.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
