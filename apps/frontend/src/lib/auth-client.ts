import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const { signIn, signUp, useSession, signOut } = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: import.meta.env.VITE_BACKEND_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        credits: {
          type: "number",
        },
      },
    }),
  ],
});
