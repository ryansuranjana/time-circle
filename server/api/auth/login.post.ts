import { createError, sendError } from "h3";
import jwt from "jsonwebtoken";
import { verifyPasswordUtil } from "~~/server/utils/auth";
import { formatZodErrors } from "~~/server/utils/zodHelpers";
import { loginSchema } from "~~/server/validators/auth";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        data: formatZodErrors(parsed.error),
        statusMessage: "Validation failed",
      });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    const isMatch = await verifyPasswordUtil(password, user.password);
    if (!isMatch) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid credentials",
      });
    }

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
      },
    };
  } catch (err: any) {
    console.log("Login error:", err);
    return sendError(event, err);
  }
});
