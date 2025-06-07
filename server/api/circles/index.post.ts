import z from "zod";
import { customAlphabet } from "nanoid";

const bodySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .max(50, "Name must be less than 50 characters"),
});

const CUSTOM_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

function generateCode(length: number = 10) {
  return customAlphabet(CUSTOM_ALPHABET, length)();
}

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event);
    const body = await readValidatedBody(event, bodySchema.parse);
    let codeCircle = String(user.id).slice(0, 2) + generateCode(6);
    let codeInvitation = String(user.id).slice(0, 2) + generateCode(6);

    while (await prisma.circle.findUnique({ where: { code: codeCircle } })) {
      codeCircle = String(user.id).slice(0, 2) + generateCode(6);
    }
    while (
      await prisma.circle.findUnique({
        where: { invitationCode: codeInvitation },
      })
    ) {
      codeInvitation = String(user.id).slice(0, 2) + generateCode(6);
    }

    const circle = await prisma.circle.create({
      data: {
        name: body.name,
        code: codeCircle,
        invitationCode: codeInvitation,
        members: {
          create: {
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

    return {
      circle: circle,
    };
  } catch (err: any) {
    console.log("circle error:", err);
    return sendError(event, err);
  }
});
