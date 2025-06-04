import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

type Role = "VOLUNTEER" | "ORGANIZER" | "ADMIN";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null;
      username: string | null;
      role: Role | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username?: string | null;
    role?: Role | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    id: string;
    username: string | null;
    role?: Role | null;
  }
}
