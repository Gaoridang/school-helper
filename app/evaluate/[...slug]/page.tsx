import React from "react";

interface Props {
  params: { slug: string[] };
}

const EvalPage = ({ params }: Props) => {
  console.log(params);

  return <div>EvalPage</div>;
};

export default EvalPage;
