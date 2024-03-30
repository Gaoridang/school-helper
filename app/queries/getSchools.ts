import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { School } from "../(auth)/signup/types/formTypes";

export const fetchSchools = async (name: string) => {
  const { data } = await axios.get("https://open.neis.go.kr/hub/schoolInfo", {
    params: {
      Type: "json",
      pIndex: 1,
      pSize: 15,
      KEY: process.env.NEXT_PUBLIC_SCHOOL_API_KEY,
      SCHUL_NM: name.trim().replaceAll(" ", ""),
    },
  });
  return data.schoolInfo[1].row as School[];
};

const useSchools = (name: string) => {
  return useQuery({
    queryKey: ["schools", name],
    queryFn: () => fetchSchools(name),
    enabled: !!name,
  });
};

export default useSchools;
