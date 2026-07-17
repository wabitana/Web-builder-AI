const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fetching projects...');
  const projects = await prisma.project.findMany();

  if (projects.length === 0) {
    console.log('No projects found to seed. Create a project first.');
    return;
  }

  for (const project of projects) {
    console.log(`Seeding data for project: ${project.name} (${project.id})`);

    // Clean up existing if any
    await prisma.deployment.deleteMany({ where: { projectId: project.id } });
    await prisma.analytics.deleteMany({ where: { projectId: project.id } });

    // Seed Deployments
    await prisma.deployment.createMany({
      data: [
        { projectId: project.id, branch: 'main', status: 'Ready', url: `${project.name.toLowerCase().replace(/\s+/g, '-')}-vercel.app` },
        { projectId: project.id, branch: 'feature/new-ui', status: 'Building' },
        { projectId: project.id, branch: 'main', status: 'Failed' },
      ],
    });

    // Seed Analytics
    await prisma.analytics.create({
      data: {
        projectId: project.id,
        views: Math.floor(Math.random() * 50000) + 1000,
        visitors: Math.floor(Math.random() * 5000) + 500,
        avgSessionDuration: Math.floor(Math.random() * 300) + 60, // 60 to 360 seconds
        bounceRate: Math.random() * 40 + 20, // 20% to 60%
      },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
