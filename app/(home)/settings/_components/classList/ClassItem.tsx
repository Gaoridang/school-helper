import { Tables } from "@/database.types";

interface Props {
  classInfo: Tables<"user_class_info">;
}

const ClassItem = ({ classInfo }: Props) => {
  return (
    <div>
      <h2>{classInfo.school}</h2>
      <p>{classInfo.grade}학년</p>
      <p>{classInfo.class_number}반</p>
    </div>
  );
};

export default ClassItem;
