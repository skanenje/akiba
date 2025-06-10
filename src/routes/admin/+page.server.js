import db from '$lib/db';

export async function load() {
  try {
    const projects = await db.project.findMany();
    const donations = await db.donation.findMany();

    return {
      projects,
      donations,
    };
  } catch (error) {
    console.error('Error fetching data for admin dashboard:', error);
    throw error;
  }
}