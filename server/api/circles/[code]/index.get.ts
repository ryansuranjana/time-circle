export default defineEventHandler(async (event) => {
  try {
    const codeCircle = getRouterParam(event, "code");
    const query = getQuery(event);
    const year = query.year
      ? parseInt(query.year as string)
      : new Date().getFullYear();
    const month = query.month
      ? parseInt(query.month as string)
      : new Date().getMonth() + 1;

    await requireUserSession(event);

    const members = await prisma.user.findMany({
      where: {
        circles: {
          some: {
            circle: {
              code: codeCircle,
            },
          },
        },
      },
      include: {
        schedules: {
          where: {
            date: {
              gte: new Date(year, month - 1, 1),
              lt: new Date(year, month, 1),
            },
          },
        },
      },
    });
    const totalCircleMembers = members.length;

    const scheduleMap = new Map<string, number>();
    const userInDate: number[] = [];

    members.forEach((member) => {
      member.schedules.forEach((schedule) => {
        const dateKey = schedule.date.toISOString().split("T")[0];
        if (scheduleMap.has(dateKey)) {
          if (!userInDate.includes(schedule.userId)) {
            scheduleMap.set(dateKey, scheduleMap.get(dateKey)! + 1);
            userInDate.push(schedule.userId);
          }
        } else {
          userInDate.push(schedule.userId);
          scheduleMap.set(dateKey, 1);
        }
      });
    });

    const circleSchedules = Array.from(scheduleMap.entries())
      .map(([dateCircle, totalMembers]) => {
        if (totalMembers === totalCircleMembers) {
          return dateCircle;
        } else {
          return "";
        }
      })
      .filter((date) => date !== "");

    return {
      members: members,
      schedules: circleSchedules,
    };
  } catch (err: any) {
    console.log();
    return sendError(event, err);
  }
});
