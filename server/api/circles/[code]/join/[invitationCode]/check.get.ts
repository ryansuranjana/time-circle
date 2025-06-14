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
    if (circleExists.invitationCode !== invitationCode) {
      throw createError({
        statusCode: 400,
        message: "Invalid invitation code",
      });
    }

    return {
      isAlreadyJoined: circleExists.members.length > 0,
    };
  } catch (err: any) {
    console.error("Error in join circle handler:", err);
    sendError(event, err);
  }
});
