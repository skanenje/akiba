import { db } from '$lib/db';

export async function load({ params }) {
  const { projectId } = params;

  try {
    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    return {
      project,
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
}