import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { API_ROUTE, BASE_URL } from "./lib/const"
import axios from "axios"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async ({email, password}) => {
       try{
        const signInUrl=BASE_URL+API_ROUTE.auth.login 
        const user =  await axios.post(signInUrl, {
          email,
          password
        })
        console.log({user})
        return null
       }catch(e){
        console.log(e)
        return null
       }
      },
    }),
  ],
})