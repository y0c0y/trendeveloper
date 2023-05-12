import React from "react";
import styles from "../css/DetailTrendBack.module.css";
// import { PieChart } from "react-native-gifted-charts";

const DetailTrendBack = () => {
  // const pieData = [
  //   { value: 54, color: "#177AD5", text: "54%" },
  //   { value: 40, color: "#79D2DE", text: "30%" },
  //   { value: 20, color: "#ED6665", text: "26%" },
  // ];

  return (
    <div className={styles["trend-back"]}>
      <div className={styles.background}></div>
      {/* <View>
        <PieChart
          showText
          textColor="black"
          radius={150}
          textSize={20}
          showTextBackground
          textBackgroundRadius={26}
          data={pieData}
        />
      </View> */}
    </div>
  );
};

export default DetailTrendBack;
