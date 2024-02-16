import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignInButton from "./components/SignInButton";

export default function Home() {
  return (
    <div className="max-w-xl m-auto">
      <Link href="/activities">
        <Button>체크리스트 만들기</Button>
      </Link>
      <SignInButton />
    </div>
  );
}
