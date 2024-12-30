import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const contributors = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        _count: {
          select: {
            places: true,
            votes: true,
          },
        },
      },
      orderBy: {
        places: {
          _count: 'desc',
        },
      },
      take: 10,
    });

    const topContributors = contributors.map(contributor => ({
      id: contributor.id,
      name: contributor.name || contributor.email.split('@')[0],
      points: (contributor._count.places * 10) + (contributor._count.votes * 2),
    }));

    return new Response(JSON.stringify(topContributors), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error loading top contributors' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
