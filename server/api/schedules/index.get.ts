export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event);
    const query = getQuery(event);

    const filter = query.filter as string | undefined;
    const startDateStr = query.startDate as string | undefined;
    const endDateStr = query.endDate as string | undefined;

    const now = new Date();
    const where: any = {
      userId: user.id,
      date: {},
    };

    // Filter berdasarkan waktu sekarang
    if (filter === "incoming") {
      where.date.gte = now;
    } else if (filter === "past") {
      where.date.lt = now;
    }

    // Tambahkan startDate dan endDate jika ada
    if (startDateStr) {
      const startDate = new Date(startDateStr);
      // Gunakan Math.max agar gte = yang paling besar antara now dan startDate jika filter === "incoming"
      if (filter === "incoming") {
        where.date.gte = new Date(Math.max(now.getTime(), startDate.getTime()));
      } else if (filter !== "past") {
        where.date.gte = startDate;
      }
    }

    if (endDateStr) {
      const endDate = new Date(endDateStr);
      where.date.lte = endDate;
    }

    // Bersihkan date jika kosong (tidak ada gte atau lt atau lte)
    if (Object.keys(where.date).length === 0) {
      delete where.date;
    }

    const schedules = await prisma.schedules.findMany({
      where,
      orderBy: [
        {
          date: "asc",
        },
        {
          startTime: "asc",
        },
        {
          endTime: "asc",
        },
      ],
    });

    return { schedules };
  } catch (err: any) {
    console.error("schedule error:", err);
    return sendError(event, err);
  }
});
