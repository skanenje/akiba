import { db } from '$lib/db';

export async function load() {
  const projects = await db.project.findMany();

  const totalDonations = projects.reduce((sum, project) => sum + project.donations, 0);
  const totalAmount = projects.reduce((sum, project) => sum + project.amount, 0);
  const activeProjects = projects.filter(project => project.active).length;
  const avgDonation = totalDonations > 0 ? totalAmount / totalDonations : 0;

  const stats = {
    totalDonations,
    totalAmount,
    activeProjects,
    avgDonation
  };

  return {
    projects,
    stats
  };
}