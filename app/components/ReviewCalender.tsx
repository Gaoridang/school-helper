// "use client";

// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { User } from "@supabase/supabase-js";
// import { format } from "date-fns";
// import { ko } from "date-fns/locale";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { ActiveModifiers, DayContentProps } from "react-day-picker";
// import { useClass } from "../(teacher)/hooks/useClass";
// import { getSubjectName } from "../evaluate/getSubjectName";
// import { toWhom } from "../evaluate/toWhom";
// import { Tables } from "../types/schema";
// import { fetchLinkedStudent } from "../utils/fetchLinkedStudent";
// import { fetchReviews } from "../utils/fetchReviews";
// import CustomTooltip from "./Tooltip";

// interface Props {
//   user: User | null;
// }

// const ReviewCalendar = ({ user }: Props) => {
//   const [reviews, setReviews] = useState<Tables<"session_evaluation_summary">[]>([]);
//   const { selectedClassId } = useClass();
//   const [selectedDay, setSelectedDay] = useState<Date>();
//   const selectedDayFormatted = format(selectedDay ?? new Date(), "y-M-d", { locale: ko });
//   const router = useRouter();

//   useEffect(() => {
//     if (!user || !selectedClassId) return;

//     const getReviewData = async () => {
//       if (user.user_metadata.role === "parents") {
//         const linkedStudent = await fetchLinkedStudent(user);
//         if (linkedStudent) {
//           const reviews = await fetchReviews(selectedClassId, linkedStudent.student_id);
//           setReviews(reviews);
//         }
//       } else {
//         const reviews = await fetchReviews(selectedClassId, user.id);
//         setReviews(reviews);
//       }
//     };
//     getReviewData();
//   }, [selectedClassId, user]);

//   const handleSelect = async (
//     day: Date | undefined,
//     selectedDay: Date,
//     modifiers: ActiveModifiers,
//   ) => {
//     setSelectedDay(day);
//   };

//   const footer = (
//     <div className="grid grid-cols-2 gap-2 mt-4">
//       {reviews && reviews.length > 0 ? (
//         reviews?.map((review) => {
//           if (format(new Date(review.date!), "y-M-d") === selectedDayFormatted) {
//             return (
//               <Button
//                 key={review.session_id}
//                 onClick={() =>
//                   router.push(`/evaluate/results?id=${review.session_id}&type=${review.type}`)
//                 }
//                 className="flex flex-col items-center justify-center"
//               >
//                 <span>{`${review.period} ${getSubjectName(review.subject_name)}`}</span>
//                 <span className="font-semibold text-xs">{toWhom(review.type!)}</span>
//               </Button>
//             );
//           }
//         })
//       ) : (
//         <p className="col-span-2">해당 날짜에 결과가 없습니다.</p>
//       )}
//     </div>
//   );

//   const DayConent = (props: DayContentProps) => {
//     return (
//       <div>
//         <span>{props.date.getDate()}</span>
//         <div className="flex gap-1">
//           {reviews?.map((review) => {
//             if (format(new Date(review.date!), "y-M-d") === format(props.date, "y-M-d")) {
//               return (
//                 <div
//                   key={review.session_id}
//                   className="w-1 h-1 rounded-full bg-green-500 place-self-center"
//                 ></div>
//               );
//             }
//           })}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Card>
//         <CardHeader className="flex flex-col justify-center items-center">
//           <CardTitle className="flex items-center gap-2">
//             내 결과 보기
//             <CustomTooltip href="/reviews">
//               <span>요약 보기</span>
//             </CustomTooltip>
//           </CardTitle>
//           <CardDescription>날짜를 선택하세요.</CardDescription>
//         </CardHeader>
//         <CardContent className="flex justify-center">
//           <Calendar
//             locale={ko}
//             mode="single"
//             selected={selectedDay}
//             onSelect={handleSelect}
//             footer={footer}
//             DayContent={DayConent}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ReviewCalendar;
