import {compare, genSalt, hash} from 'bcrypt';

export function validatePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return compare(password, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt();
  return hash(password, salt);
}
