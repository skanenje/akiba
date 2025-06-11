import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    const data = await request.json();
    const { name, description, category, amount } = data;
    const project = await prisma.project.create({
      data: { name, description, category, amount }
    });
    return json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return json({ error: 'Failed to create project' }, { status: 500 });
  }
}