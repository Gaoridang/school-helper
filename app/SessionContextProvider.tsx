"use client";

import { SessionContextProvider as SupabaseSessioinContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./utils/supabase/client";
import { PropsWithChildren } from "react";

const SessionContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <SupabaseSessioinContextProvider supabaseClient={supabase}>
      {children}
    </SupabaseSessioinContextProvider>
  );
};

export default SessionContextProvider;
