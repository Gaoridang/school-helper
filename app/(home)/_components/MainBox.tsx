import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainBox = ({ children }: Props) => {
  return <div className="flex flex-col gap-4 max-w-lg">{children}</div>;
};

export default MainBox;
