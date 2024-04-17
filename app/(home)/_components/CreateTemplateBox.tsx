import React from "react";
import MainBox from "./MainBox";
import MainTitle from "./MainTitle";
import LinkCard from "./LinkCard";

const CreateTemplateBox = () => {
  return (
    <MainBox>
      <MainTitle
        title="평가 템플릿"
        description="원하는 날짜의 평가 템플릿을\n미리 만들고 확인해보세요."
      />
      <LinkCard href="/templates/new" title="평가 템플릿 만들기" />
      <LinkCard href="/templates" title="평가 템플릿 보기" />
    </MainBox>
  );
};

export default CreateTemplateBox;
