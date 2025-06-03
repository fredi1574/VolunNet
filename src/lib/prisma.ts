import { PrismaClient } from "@prisma/client";

declare global {
  const prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({ log: ["query", "error", "warn", "info"] });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
