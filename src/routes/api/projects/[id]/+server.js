import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, params }) {
  const id = parseInt(params.id);

  try {
    const data = await request.json();
    const project = await prisma.project.update({
      where: { id },
      data
    });
    return json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return json({ error: 'Failed to update project' }, { status: 500 });
  }
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
  const id = parseInt(params.id);

  try {
    await prisma.project.delete({
      where: { id }
    });
    return json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return json({ error: 'Failed to delete project' }, { status: 500 });
  }
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const id = parseInt(params.id);

    try {
        const project = await prisma.project.findUnique({
            where: { id }
        });
        return json(project);
    } catch (error) {
        console.error('Error getting project:', error);
        return json({ error: 'Failed to get project' }, { status: 500 });
    }
}