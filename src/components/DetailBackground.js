import React, { useState, useEffect } from "react";
import styles from "../css/DetailBackground.module.css";

const API_URI = process.env.REACT_APP_API_URI;

<<<<<<< HEAD
const DetailBackground = () => {
  let [detailData, setdetailData] = useState(null);
=======
const DetailBackground=()=> {

  let [detailData, setdetailData] = useState(null)
>>>>>>> re/master
  let respJSON = useState({});
  //let logoLink = useState("");
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const fetchData = async () => {
      if (urlSearchParams.has("id")) {
        console.log(urlSearchParams.get("id"));
        let recruitmentID = urlSearchParams.get("id");
        //const token = localStorage.getItem("token");

        let resp = await fetch(
          API_URI + "/api/v1/recruitment/detail?id=" + recruitmentID,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              //"Authorization": "Bearer " + token
            },
            body: JSON.stringify(),
          }
        );
        respJSON = await resp.json();
        console.log(respJSON);
        setdetailData(respJSON);
        //logoLink = respJSON["logoLink"];
      }
    };

    fetchData();
  }, [detailData]);

  return (
    <div className={styles["detail-background"]}>
      <div className={styles.box1}>
        {/* 상단 핑크색 바*/}
        <div className={styles["top-bar"]} />
        {/* 내부 박스*/}
        <div className={styles["inner-box"]} />
        {/*번호 매기기*/}
        <div className={styles.circle1}>
          <span>1</span>
        </div>
        <div className={styles.text1}>담당 업무</div>
        <p className={styles.p1}>
          {detailData ? detailData.jobCont : "Loading..."}
        </p>
      </div>
      <div className={styles.box2}>
        {/* 상단 핑크색 바*/}
        <div className={styles["top-bar"]} />
        {/* 내부 박스*/}
        <div className={styles["inner-box"]} />
        {/*번호 매기기*/}
        <div className={styles.circle2}>
          <span>2</span>
        </div>
        <div className={styles.text2}>자격 요건</div>
      </div>
      <div className={styles.box3}>
        {/* 상단 핑크색 바*/}
        <div className={styles["top-bar"]} />
        {/* 내부 박스*/}
        <div className={styles["inner-box"]} />
        {/*번호 매기기*/}
        <div className={styles.circle3}>
          <span>3</span>
        </div>
        <div className={styles.text3}>우대 사항</div>
      </div>
    </div>
  );
};

export default DetailBackground;
