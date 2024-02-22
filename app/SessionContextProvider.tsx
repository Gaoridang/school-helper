"use client";

import { SessionContextProvider as SupabaseSessioinContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "./utils/supabase/client";
import { PropsWithChildren } from "react";

const SessionContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <SupabaseSessioinContextProvider supabaseClient={createClient()}>
      {children}
    </SupabaseSessioinContextProvider>
  );
};

export default SessionContextProvider;
