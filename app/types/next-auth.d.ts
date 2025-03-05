// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    username: string | null;
    role: number | null;
    name?: string;
    image?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      username: string | null;
      role: number | null;
      name?: string;
      image?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    username: string | null;
    role: number;
    name?: string;
    image?: string;
  }
}
