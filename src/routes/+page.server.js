import { db } from '$lib/db';

export async function load() {
  try {
    console.log('Fetching projects...');
    const projects = await db.project.findMany({ where: { active: true } }).catch(error => {
      console.error('Error fetching projects:', error);
      throw new Error('Failed to fetch projects from the database.');
    });
    console.log('Projects fetched:', projects);
    projects.forEach(project => {
      console.log('Project:', project);
      console.log('Project donations:', project.donations);
      console.log('Project amount:', project.amount);
    });

    const totalDonations = projects.reduce((sum, project) => sum + (typeof project.donations === 'number' ? Number(project.donations) : 0), 0);
    const totalAmount = projects.reduce((sum, project) => sum + (typeof project.amount === 'number' ? Number(project.amount) : 0), 0);
    const activeProjects = projects.filter(project => project.active).length;
    const avgDonation = totalDonations > 0 ? totalAmount / totalDonations : 0;

    const stats = {
      totalDonations,
      totalAmount,
      activeProjects,
      avgDonation
    };

    console.log('Stats calculated:', stats);

    return {
      projects,
      stats
    };
  } catch (error) {
    console.error('Error in load function:', error);
    console.error('Error in load function:', error);
    throw new Error('An unexpected error occurred while loading data.');
  }
}