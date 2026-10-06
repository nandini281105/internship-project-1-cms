const { PrismaClient } = require('@prisma/client');

let prisma;

try {
  prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
  });
} catch (err) {
  console.error('Failed to initialize Prisma Client:', err.message);
}

module.exports = prisma;
