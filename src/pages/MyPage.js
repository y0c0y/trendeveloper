import React from "react";
import styles from "../css/DetailPage.module.css";
import Detailbox from "../components/Detailbox";
import TrendBackground from "../components/TrendBackground";
import CompanyInfo from "../components/CompanyInfo";
import MyPageBackground from "../components/MyPageBackground";

const MyPage = () => {
  return (
    <div>
      <div className={styles.require}>
        {/* 배경 박스 */}
        <MyPageBackground />
      </div>
    </div>
  );
};

export default MyPage;
