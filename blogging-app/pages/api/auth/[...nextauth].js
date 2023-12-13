// console.log('in [...nextauth].js')
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (credentials.username === "Demo" && credentials.password === "123") {
        const user = {id: 1, name: 'Demo-user', email: "demo@test.com"};
        return Promise.resolve(user)
        } else {
          return Promise.resolve(null)
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login'
  },
  secret: process.env.auth_secret,
  callbacks: {
    async jwt(token,user) {
      if(user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session(session, token) {
      session.user = token;
      return session;
    }
  }
})

