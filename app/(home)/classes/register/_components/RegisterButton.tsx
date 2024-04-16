import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  onClick: () => void;
  title: string;
}

const RegisterButton = ({ onClick, title }: Props) => {
  return (
    <Button className="mr-2" onClick={onClick}>
      {title}
    </Button>
  );
};

export default RegisterButton;
