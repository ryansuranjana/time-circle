export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event);
    const query = getQuery(event);

    const filter = query.filter as string | undefined;
    const startDateStr = query.startDate as string | undefined;
    const endDateStr = query.endDate as string | undefined;

    const now = new Date();

    const dateCondition: any = {};

    if (filter === "incoming") {
      dateCondition.gte = now;
    } else if (filter === "past") {
      dateCondition.lt = now;
    }

    if (startDateStr) {
      const startDate = new Date(startDateStr);
      dateCondition.gte = dateCondition.gte
        ? new Date(Math.max(dateCondition.gte.getTime(), startDate.getTime()))
        : startDate;
    }

    if (endDateStr) {
      const endDate = new Date(endDateStr);
      dateCondition.lte = endDate;
    }

    const where: any = {
      userId: user.id,
      ...(Object.keys(dateCondition).length > 0 ? { date: dateCondition } : {}),
    };

    const schedules = await prisma.schedules.findMany({
      where,
      orderBy: [{ date: "asc" }, { startTime: "asc" }, { endTime: "asc" }],
    });

    return { schedules };
  } catch (err: any) {
    console.error("schedule error:", err);
    return sendError(event, err);
  }
});
