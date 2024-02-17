import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/activities">
        <Button>체크리스트 만들기</Button>
      </Link>
      <p>인증된 사용자만 체크리스트를 만들 수 있습니다.</p>
    </>
  );
}
