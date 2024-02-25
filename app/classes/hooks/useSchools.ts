import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface School {
  ORG_RDNMA: string; // 주소
  SCHUL_NM: string; // 이름
  SD_SCHUL_CODE: string; // 학교 코드
}

const fetchSchools = async ({ name = "" }: { name?: string }) => {
  const { data } = await axios.get("https://open.neis.go.kr/hub/schoolInfo", {
    params: {
      Type: "json",
      pIndex: 1,
      pSize: 20,
      KEY: process.env.NEXT_PUBLIC_SCHOOL_API_KEY,
      SCHUL_NM: name.trim().replaceAll(" ", ""),
    },
  });
  return data.schoolInfo[1].row as School[];
};

const useSchools = (name: string = "") => {
  return useQuery({
    queryKey: ["schools", name],
    queryFn: () => fetchSchools({ name }),
    enabled: name.length > 0,
  });
};

export default useSchools;
