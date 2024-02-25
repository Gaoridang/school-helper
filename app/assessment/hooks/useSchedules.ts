import { createClient } from "@/app/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const fetchSchedules = async () => {
  const supabase = createClient();

  const { data: schedule, error: scheduleError } = await supabase
    .from("schedules")
    .select("*")
    .maybeSingle();

  if (scheduleError) throw scheduleError;

  return schedule;
};

const useSchedules = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["schedule"],
    queryFn: fetchSchedules,
  });

  return { ...data, schedule: data?.schedule as string[][], error, isLoading };
};

export default useSchedules;
