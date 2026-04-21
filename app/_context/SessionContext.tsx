"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "../_actions/auth/getSession";

type SessionType = {
  loggedInUser: boolean;
};

const SessionContext = createContext<SessionType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState(false);

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      setLoggedInUser(session);
    }
    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={{ loggedInUser }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("Session context was used outside of the provider");
  }
  return context;
};
