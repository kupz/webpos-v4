import { useCookies } from "react-cookie";
import { getUserInfo } from "../api/api";
import { useEffect, useState } from "react";

function IsLoggedIn(Component) {
  const [cookies, setCookie, removeCookie] = useCookies("user");

  const accessToken = cookies.accessToken ?? null;
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    if (accessToken) {
      getUserInfo(accessToken).then((res) => {
        if (res.ok) {
          setLoggedIn(true);
          setUserInfo(res.data);
          // console.log(loggedIn);
        } else {
          setLoggedIn(false);
        }
      });
    }
  }, [accessToken]);

  // console.log(loggedIn);

  return <Component isLoggedIn={loggedIn} userInfo={userInfo} />;

  // console.log(accessToken);
}

export default IsLoggedIn;
