import ScheduleCard from "@/app/assessment/ScheduleCard";

interface Props {
  params: { id: string };
}

const ClassDetailPage = ({ params }: Props) => {
  return (
    <>
      <ScheduleCard />
    </>
  );
};

export default ClassDetailPage;
