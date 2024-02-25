import React from "react";
import { createClient } from "../utils/supabase/server";
import ClassCard from "./components/ClassCard";

const ClassesPage = async () => {
  return (
    <div>
      <ClassCard />
    </div>
  );
};

export default ClassesPage;
