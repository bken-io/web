import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import db from '../../../utils/db';

export default NextAuth({
  pages: {
    newUser: '/studio',
    signIn: '/login',
  },
  adapter: Adapters.Prisma.Adapter({ prisma: db }),
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session(session, token) { 
      session.id = token.id;
      return Promise.resolve(session);
    },
    redirect(url) {
      if (url === '/api/auth/signin') {
        return Promise.resolve('/');
      }
      // Send account information to bken api
      return Promise.resolve('/api/auth/signin');
    },
  },
});