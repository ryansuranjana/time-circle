type User = {
  id: number;
  nickname: string;
};

export default defineEventHandler(async (event) => {
  try {
    const codeCircle = getRouterParam(event, "code");
    const date = getRouterParam(event, "date") as string;

    console.log("Attendance handler for circle:", codeCircle, "on date:", date);

    await requireUserSession(event);

    const circles = await prisma.circle.findMany({
      where: {
        code: codeCircle,
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    const memberIds = circles.flatMap((circle) =>
      circle.members.map((member) => member.user.id)
    );

    const memberTimes = await prisma.schedules.findMany({
      where: {
        userId: {
          in: memberIds,
        },
        date: new Date(date),
      },
    });

    const events: {
      type: "start" | "end";
      user: User;
      time: Date;
    }[] = [];

    memberTimes.forEach((schedule) => {
      const user = circles
        .flatMap((circle) => circle.members)
        .find((member) => member.user.id === schedule.userId)?.user;

      if (user) {
        events.push({
          type: "start",
          user: {
            id: user?.id,
            nickname: user?.nickname,
          },
          time: schedule.startTime,
        });
        events.push({
          type: "end",
          user: {
            id: user?.id,
            nickname: user?.nickname,
          },
          time: schedule.endTime,
        });
      }
    });

    let activeUsers: User[] = [];
    const schedulesMap: {
      start: Date;
      end: Date;
      users: any;
    }[] = [];
    let previousTime: Date | null = null;

    events.sort((a, b) => {
      const timeDiff = a.time.getTime() - b.time.getTime();
      if (timeDiff !== 0) {
        return timeDiff;
      }

      if (a.type === "start" && b.type === "end") return -1;
      if (a.type === "end" && b.type === "start") return 1;
      return 0;
    });

    events.forEach((event) => {
      if (previousTime !== null && previousTime != event.time) {
        schedulesMap.push({
          start: new Date(previousTime),
          end: new Date(event.time),
          users: [...activeUsers],
        });
      }

      if (event.type === "start") {
        activeUsers.push(event.user);
      } else if (event.type === "end") {
        activeUsers = activeUsers.filter((user) => user.id !== event.user.id);
      }

      previousTime = new Date(event.time);
    });

    return {
      data: schedulesMap,
    };
  } catch (err: any) {
    console.error("Error in attendance handler:", err);
    sendError(event, err);
  }
});
