import React, { useState, useEffect } from "react";
import styles from "../css/CompanyInfo.module.css";
import { useNavigate } from "react-router-dom";

const API_URI = process.env.REACT_APP_API_URI;

const CompanyInfo = () => {
  let [companyInfo, setCompanyInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const fetchCompanyInfo = async () => {
      // const token = localStorage.getItem('token');
      let recruitmentID = urlSearchParams.get("id");

      const response = await fetch(
        API_URI + "/api/v1/recruitment/detail?id=" + recruitmentID,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify(),
        }
      );

      const respJSON = await response.json();

      const response2 = await fetch(
        API_URI + "/api/v1/company/detail?id=" + respJSON["companyName"],
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify(),
        }
      );

      const respJSON2 = await response2.json();
      setCompanyInfo(respJSON2);
    };

    fetchCompanyInfo();
  }, []);

  return (
    <div className={styles["company-info"]}>
      <div className={styles["info-box"]}>
        {/* 기업 정보 라벨 */}
        <div className={styles["info-title"]}>기업 정보</div>
        {/* 기업 정보 종류 리스트 */}
        <div className={styles["info-type"]}>
          <ul className={styles["info-list"]}>
            {CompanyInfo && (
              <>
                <li>
                  기업명{" "}
                  <span>
                    {companyInfo ? companyInfo.companyName : "Loading..."}
                  </span>
                </li>
                <li>
                  기업형태{" "}
                  <span>
                    {companyInfo ? companyInfo.busiSize : "Loading..."}
                  </span>
                </li>
                <li>
                  사원수{" "}
                  <span>
                    {companyInfo ? companyInfo.totPsncnt : "Loading..."}
                  </span>
                </li>
                <li>
                  자본규모{" "}
                  <span>
                    {companyInfo ? companyInfo.capitalAmt : "Loading..."}
                  </span>
                </li>
                <li>
                  연매출액{" "}
                  <span>
                    {companyInfo ? companyInfo.yrSalesAmt : "Loading..."}
                  </span>
                </li>
                <li>
                  대표자명{" "}
                  <span>
                    {companyInfo ? companyInfo.reperNm : "Loading..."}
                  </span>
                </li>
                <li>
                  기업주소{" "}
                  <span>
                    {companyInfo ? companyInfo.corpAddr : "Loading..."}
                  </span>
                </li>
                <li>
                  홈페이지{" "}
                  <span>
                    {companyInfo ? (
                      <a
                        href={`https://${companyInfo.homePg}`}
                        target="_blank"
                        rel="noreferrer"
                      >{companyInfo.homePg}</a>
                    ) : (
                      "Loading..."
                    )}
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
