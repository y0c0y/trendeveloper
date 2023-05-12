import React from "react";
import CompanyInfo from "../components/CompanyInfo";
import Companylogo from "../components/Companylogo";
import DetailMenu from "../components/DetailMenu";
import DetailTrendBack from "../components/DetailTrendBack";
import RecruitmentList from "../components/RecruitmentList";

const DetailTrend = ()=> {
  return (
<div>
  <CompanyInfo/>
  <Companylogo/>
  <DetailMenu/>
  <DetailTrendBack />
  <RecruitmentList />
</div>
  );
};

export default DetailTrend;