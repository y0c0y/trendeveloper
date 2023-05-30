import React, { useState, useEffect, useMemo, useContext } from "react";
import styles from "../css/TrendBackground.module.css";
import "../css/Navbar.css";

import SimpleSlider from "./Slider";
import ApexChart from "./charts";

import { Link, useLocation, useNavigate } from "react-router-dom";
import TrendReport from "./TrendReport";
import HowRank from "./Modal";
import { ComContext } from "../context/Com.context";

const TrendBackground = (props) => {
  const { jobKor, transName } = useContext(ComContext);

  const [topList, setTopList] = useState([]);

  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    navigate(`?id=${id}`);
  };
  const ranks = props.ranks;
  let urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");

  useEffect(() => {
    if (!id) {
      navigate(`/trend/stat?id=${ranks[0]}`);
    }
    console.log(urlSearchParams.get("id"));

    const tmpList = ranks.map((item, index) => {
      const tmp = transName(item, jobKor);
      return (
        <button
          key={item}
          className={`${styles.btn} ${id === item ? styles.selected : ""}`}
          onClick={() => handleButtonClick(item)}
        >
          {tmp}
        </button>
      );
    });
    setTopList(tmpList);
  }, [id]);

  return (
    <div>
      <div className={styles.contents}>
        <div className={`${styles["sub-text"]} ${styles.text}`}>
          <span className="title s-title ">
            TREN<span>D</span>EVELOPER
          </span>가 선정한 요즘 뜨는 "TOP 5" 직군이에요!
          {/* <span className={`${styles.next} `}>
            <HowRank />
          </span> */}
        </div>
        <div className={`${styles.rank} ${styles.text}`}>
          <div className={styles.list}>{topList}</div>
        </div>
      </div>

      <TrendReport jobKor={jobKor} transName={transName} />
    </div>
  );
};

export default TrendBackground;
