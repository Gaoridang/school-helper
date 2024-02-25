import React from "react";
import { createClient } from "../utils/supabase/server";

const ClassesPage = async () => {
  const supabase = createClient();
  const { data } = await supabase.from("classes").select("*");

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ClassesPage;
