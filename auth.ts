import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getAdmin } from "./lib/get-admin";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			name: "Admin",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					if (!credentials) {
						throw new Error("Missing credentials.");
					}

					const { username, password } = credentials as {
						username: string;
						password: string;
					};

					if (!username || !password) {
						throw new Error("Username and password are required.");
					}

					const user = await getAdmin({ username, password });

					if (!user) {
						throw new Error("Invalid username or password.");
					}

					return user;
				} catch (err) {
					console.error("[Auth Error]", err);
					throw new Error("Authentication failed.");
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 24 * 60 * 60, // 1 days
		updateAge: 6 * 60 * 60, // 6 hours
	},
});
