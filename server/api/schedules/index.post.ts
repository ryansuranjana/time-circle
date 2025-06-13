import z from "zod";

const bodySchema = z.object({
  date: z.string({ required_error: "Date is required" }),
  startTime: z.string({ required_error: "Start time is required" }),
  endTime: z.string({ required_error: "End time is required" }),
});

function createUtcDateFromLocal(dateStr: string, timeStr: string) {
  const [hour, minute] = timeStr.split(":").map(Number);
  const date = new Date(dateStr);

  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute)
  );
}

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event);
    const body = await readValidatedBody(event, bodySchema.parse);

    const startTime = createUtcDateFromLocal(body.date, body.startTime);
    const endTime = createUtcDateFromLocal(body.date, body.endTime);

    const schedule = await prisma.schedules.create({
      data: {
        userId: user.id,
        date: new Date(body.date), // disimpan sebagai date
        startTime, // disimpan sebagai Date object
        endTime, // disimpan sebagai Date object
      },
    });

    return {
      schedule,
    };
  } catch (err: any) {
    console.error("schedule error:", err);
    return sendError(event, err);
  }
});
