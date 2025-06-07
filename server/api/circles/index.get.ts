import { sendError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event);
    const query = getQuery(event);

    const circles = await prisma.circle.findMany({
      where: {
        name: {
          contains: query.search ? String(query.search) : undefined,
        },
        members: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        members: {
          select: {
            user: true,
          },
        },
      },
    });

    console.log("circles:", circles);

    return {
      circles: circles,
    };
  } catch (err: any) {
    console.log("circle error:", err);
    return sendError(event, err);
  }
});
