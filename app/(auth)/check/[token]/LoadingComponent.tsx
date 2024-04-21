import Lottie from "react-lottie-player";
import LoadingAnimation from "@/public/loading.json";

const LoadingComponent = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Lottie loop animationData={LoadingAnimation} play />
    </div>
  );
};

export default LoadingComponent;
