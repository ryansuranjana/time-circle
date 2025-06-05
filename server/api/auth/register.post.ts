import { registerSchema } from "~~/server/validators/auth";
import { hashPasswordUtil } from "~~/server/utils/auth";
import { sendError, createError } from "h3";
import jwt from "jsonwebtoken";
import { formatZodErrors } from "~~/server/utils/zodHelpers";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        data: formatZodErrors(parsed.error),
        statusMessage: "Validasi gagal",
      });
    }

    const { email, password, nickname } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: "Email sudah terdaftar",
      });
    }

    const hashed = await hashPasswordUtil(password);

    const user = await prisma.user.create({
      data: {
        email,
        nickname,
        password: hashed,
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      useRuntimeConfig().jwtSecret,
      {
        expiresIn: "7d",
      }
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { token },
    });

    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        token: user.token,
      },
    };
  } catch (error: any) {
    console.error("Registration error:", error);
    return sendError(event, error);
  }
});
