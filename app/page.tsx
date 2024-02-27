import MainContents from "./components/MainContents";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4">
      <MainContents />
    </div>
  );
}
