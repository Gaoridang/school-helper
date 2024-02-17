import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/activities">
        <Button>체크리스트 만들기</Button>
      </Link>
    </>
  );
}
