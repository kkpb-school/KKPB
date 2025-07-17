// lib/get-admin.ts

export interface AdminCredentials {
  username: string;
  password: string;
}

export async function getAdmin({
  username,
  password,
}: AdminCredentials): Promise<{ id: string; name: string } | null> {
  if (!username || !password) return null;

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username !== adminUsername || password !== adminPassword) {
    return null;
  }

  return {
    id: "admin", // required by NextAuth
    name: "Administrator",
  };
}
