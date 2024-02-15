import TopicSelect from "./check/TopicSelect";

export default function Home() {
  return (
    <div className="max-w-xl m-auto">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5">
        체크리스트 만들기
      </h2>
      <TopicSelect />
    </div>
  );
}
