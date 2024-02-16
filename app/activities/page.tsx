"use client";

import React, { useState } from "react";
import ActivitySelector from "./_components/ActivitySelector";
import QuestionsTable from "./_components/QuestionsTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase/client";

const ActivityListPage = () => {
  const [selectedActivityId, setSelectedActivityId] = useState<number>();
  const { data: activities } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const { data, error } = await supabase.from("activities").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const handleSelectActivityId = (id: number) => {
    setSelectedActivityId(id);
  };

  return (
    <>
      <ActivitySelector activities={activities} handleSelectedActivityId={handleSelectActivityId} />
      <QuestionsTable activityId={selectedActivityId} />
    </>
  );
};

export default ActivityListPage;
