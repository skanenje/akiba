import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  try {
    const donations = await prisma.mpesaTransaction.findMany();
    return json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return json({ error: 'Failed to fetch donations' }, { status: 500 });
  }
}