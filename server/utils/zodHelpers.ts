import { ZodError } from "zod";

export const formatZodErrors = (error: ZodError) => {
  const result: Record<string, string[]> = {};
  error.issues.forEach((issue) => {
    const key = issue.path[0] as string;
    if (!result[key]) result[key] = [];
    result[key].push(issue.message);
  });
  return result;
};
