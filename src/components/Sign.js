import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/Auth.context.js";

import styles from "../css/Sign.module.css";

const API_URI = process.env.REACT_APP_API_URI;

// 로그아웃
async function signoutUser() {
  const savedToken = `Bearer ${localStorage.getItem("token")}`;

  // console.log(savedToken);

  // return localStorage.removeItem("user");

  return fetch(API_URI + "/api/v1/auth/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: savedToken,
    },
    body: JSON.stringify(),
  }).then((data) => data);
}

const Sign = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const [signState, setSignState] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { isSignedIn, changeSignedIn } = useContext(AuthContext);

  useEffect(() => {
    // const tmp = localStorage.getItem("token");
    // console.log(token);
    // console.log(localStorage.getItem("token"));
    const tmp = localStorage.getItem("token");
    const setSignout = async () => {
      const response = await signoutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");

      // console.log(response.status);
      if (response.ok) {
        console.log("로그아웃에 성공했습니다.");
        changeSignedIn();
        //   navigate("/");
      } else {
        // console.log(response.message);
        // console.log(localStorage.getItem("token"));
        console.log("로그아웃에 실패했습니다.");
        changeSignedIn();
        navigate("/");
      }
    };

    const menu = () => {
      return (
        <ul className={styles.group}>
          {tmp ? (
            <>
              {/* <li className={styles.userTag}>{name} 님</li> */}
              <li className={styles.userTag}>
                <Link to="/mypage" className={styles.nav}>
                  마이페이지
                </Link>
              </li>
              {/* <li className={styles.userTag}>
                <span className={styles.separator}>|</span>
              </li> */}
              <li className={styles.userTag}>
                <Link to="/" className={styles.nav} onClick={setSignout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={styles.userTag}>
                <Link to="/signup" className={styles.nav}>
                  회원가입
                </Link>
              </li>
              <li className={styles.userTag}>
                <Link to="/signin" className={styles.nav}>
                  로그인
                </Link>
              </li>
            </>
          )}
        </ul>
      );
    };
    // setToken(tmp);

    // console.log(tmp);
    setToken(tmp);

    setSignState(menu);
  }, [changeSignedIn]);

  return <>{signState}</>;
};

export default Sign;
