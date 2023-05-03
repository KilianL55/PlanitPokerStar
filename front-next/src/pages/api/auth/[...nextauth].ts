import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {signOut} from "next-auth/react";

export default NextAuth({
        providers: [
            CredentialsProvider({
                name: 'Credentials',
                credentials: {
                    username: {name: 'username', label: "Username", type: "text", placeholder: "jsmith"},
                    password: {name: 'password', label: "Password", type: "password"},
                },
                async authorize(credentials, req) {
                    var data = new URLSearchParams();
                    data.append('username', credentials.username);
                    data.append('password', credentials.password);
                    const res = await fetch("http://127.0.0.1:8090/api/connect", {
                        method: 'POST',
                        body: data,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    })
                    const user = await res.json().then((data) => data)
                    console.log(user)

                    if (res.ok && user) {
                        return user
                    }
                    return null
                }
            })
        ],
        callbacks: {
            jwt: async ({ token, user }) => {
                user && (token.user = user)
                return token
            },
            session: async ({ session, token }) => {
                session.user = token.user
                return session
            },
            redirect({url, baseUrl}) {
                return url
            }
        },
        pages: {
            signIn: '/login',
            error: '/login'
        }
    }
)