import bcrypt from "bcrypt";

export const hashPasswordUtil = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const verifyPasswordUtil = async (plain: string, hash: string) => {
  return await bcrypt.compare(plain, hash);
};
