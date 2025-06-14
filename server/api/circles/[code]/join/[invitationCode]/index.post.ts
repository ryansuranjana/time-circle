export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event);
    const codeCircle = getRouterParam(event, "code");
    const invitationCode = getRouterParam(event, "invitationCode");

    const circleExists = await prisma.circle.findUnique({
      where: {
        code: codeCircle,
      },
      include: {
        members: {
          where: {
            userId: user.id,
          },
          select: {
            userId: true,
          },
        },
      },
    });

    if (!circleExists) {
      throw createError({
        statusCode: 404,
        message: "Circle not found",
      });
    }
    if (circleExists.members.length > 0) {
      throw createError({
        statusCode: 400,
        message: "You are already a member of this circle",
      });
    }
    if (circleExists.invitationCode !== invitationCode) {
      throw createError({
        statusCode: 400,
        message: "Invalid invitation code",
      });
    }

    const circle = await prisma.circle.update({
      where: {
        code: codeCircle,
        invitationCode: invitationCode,
      },
      data: {
        members: {
          create: {
            userId: user.id,
          },
        },
      },
    });

    return {
      user: user,
      circle: circle,
    };
  } catch (err: any) {
    console.error("Error in join circle handler:", err);
    sendError(event, err);
  }
});
