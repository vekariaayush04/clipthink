import { createAuthClient } from "better-auth/react"
import { customSessionClient } from "better-auth/client/plugins";
import { auth } from "@repo/server/auth"

export const { signIn, signUp, useSession , signOut} = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000/",
    plugins:[customSessionClient<typeof auth>()]
})