import { Card, CardContent } from "@/components/ui/card";
import useSchools from "../../hooks/useSchools";
import useDebounce from "@/app/_hooks/useDebounce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelectSchool } from "../../hooks/useSelectSchool";

interface Props {
  value: string;
  code: string;
}

const SchoolListCard = ({ value, code }: Props) => {
  const debouncedValue = useDebounce(value);
  const { data: schools } = useSchools(debouncedValue);
  const { school: selectedSchool, setSchool: setSelectedSchool } = useSelectSchool();
  const router = useRouter();

  if (!schools)
    return (
      <Card>
        <CardContent className="grid gap-2 pt-6">
          <p>검색 결과가 없습니다.</p>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardContent className="grid pt-6">
        {schools?.map((school) => (
          <div
            key={school.SCHUL_NM}
            className="flex flex-col gap-1 p-2 hover:bg-slate-100 cursor-pointer"
            onClick={() => setSelectedSchool(school.SCHUL_NM)}
          >
            <p className="font-semibold">{school.SCHUL_NM}</p>
            <p className="text-sm font-light">{school.ORG_RDNMA}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SchoolListCard;
