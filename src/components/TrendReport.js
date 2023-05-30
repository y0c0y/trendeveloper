import React, { useState, useEffect, useMemo } from "react";
import styles from "../css/TrendBackground.module.css";
import "../css/Navbar.css";

import SimpleSlider from "./Slider";
import ApexChart from "./charts";
import PastChart from "./charts copy";

const API_URI = process.env.REACT_APP_API_URI;

const TrendReport = (props) => {
  const [monthKeys, setMonthKeys] = useState([]);
  const [monthValues, setMonthValues] = useState([]);
  let [statJSON, setStatJSON] = useState({});
  const [jobName, setJobName] = useState("");

  const [silder, setSlider] = useState(null);

  let [pastChart, setPastChart] = useState(null);
  let [futureChart, setFutureChart] = useState(null);

  const month = 3;

  useEffect(() => {
    // console.log(window.location.href);
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id");
    const fetchData = async () => {
      if (urlSearchParams.has("id")) {
        let resp = await fetch(API_URI + "/api/v1/stat?id=" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });

        let respJSON = await resp.json();
        const data = JSON.parse(respJSON.stat);

        setStatJSON(data);

        const tmpKeys = Object.keys(data).sort();

        const tmpK = tmpKeys.slice(tmpKeys.length - month, tmpKeys.length);

        const tmpPK = tmpKeys.slice(0, tmpKeys.length - month);

        console.log(tmpPK);
        const tmpValues = await Promise.all(
          tmpKeys.map(async (key) => {
            return data[key];
          })
        );
        const tmpPV = tmpValues.slice(0, tmpValues.length - month);
        const tmpV = tmpValues.slice(
          tmpValues.length - month,
          tmpValues.length
        );

        setMonthValues(tmpValues);

        let bc = new PastChart([tmpPK, tmpPV]);
        setPastChart(bc.render());

        let ac = new ApexChart([tmpK, tmpV]);
        setFutureChart(ac.render());

        const tmpSlider = () => {
          return <SimpleSlider id={id} />;
        };

        setSlider(tmpSlider);
      }
    };
    fetchData();
    const tmpName = props.transName(id, props.jobKor);
    setJobName(tmpName);
  }, [props]);

  return (
    <div div className={`${styles.background} ${styles.box}`}>
      <div className={styles.contents}>
        <div className={`${styles.text} ${styles["inner-text"]} `}>
          <span className={`${styles["clicked-job"]} ${styles.text}`}>
            {jobName}
          </span>{" "}
          의 과거 채용 동향이에요!
        </div>
        <div className={`${styles.box} ${styles["inner-box"]} `}>
          <div style={{ width: "100%" }}> {pastChart} </div>
        </div>
      </div>
      <div className={`${styles.text} ${styles["inner-text"]} `}>
        <span className={`${styles["clicked-job"]} ${styles.text}`}>
          {jobName}
        </span>{" "}
        의 향후 3개월 간 예상 채용 동향이에요!
        </div>
        <div className={`${styles.box} ${styles["inner-box"]} `}>
          <div style={{ width: "100%" }}> {futureChart} </div>
        </div>
      <div className={styles.contents}>
        <div className={`${styles.text} ${styles["inner-text"]} `}>
          <span className={`${styles["clicked-job"]} ${styles.text}`}>
            {jobName}
          </span>{" "}
          와 관련된 다른 공고도 확인해볼까요?
        </div>

        <div className={styles.notice}>{silder}</div>
      </div>
    </div>
  );
};

export default TrendReport;
