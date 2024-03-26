import PeerReviews from "@/app/components/main/PeerReviews";
import PageTitle from "@/app/components/PageTitle";

const EvaluateFriendPage = () => {
  return (
    <div className="p-4 md:p-8">
      <PageTitle title="✨ 친구에게 보내기" />
      <PeerReviews />
    </div>
  );
};

export default EvaluateFriendPage;
