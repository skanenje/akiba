import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample projects
  const sampleProjects = [
    {
      name: 'Clean Water Initiative',
      description: 'Providing clean water access to rural communities through well construction and water purification systems.',
      category: 'Health',
      amount: 50000,
    },
    {
      name: 'Education for All',
      description: 'Supporting underprivileged children with school supplies, uniforms, and learning materials.',
      category: 'Education',
      amount: 25000,
    },
    {
      name: 'Food Security Program',
      description: 'Addressing hunger in vulnerable communities through food distribution and nutrition programs.',
      category: 'Nutrition',
      amount: 35000,
    },
    {
      name: 'Green Environment Project',
      description: 'Tree planting and environmental conservation efforts to combat climate change.',
      category: 'Environment',
      amount: 20000,
    }
  ];

  // Check if projects already exist
  // const existingProjects = await prisma.project.findMany();

  // if (existingProjects.length === 0) {
    for (const project of sampleProjects) {
      await prisma.project.create({
        data: project,
      });
    }
  // } else {
  //   console.log('✅ Database already contains projects, skipping initialization.');
  // }

  // console.log('✅ Database initialized with sample projects');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
