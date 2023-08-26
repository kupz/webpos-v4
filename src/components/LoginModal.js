import { TextField, Button } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import gsap from "gsap";
import logo from "../assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { login } from "../api/api";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export default function LoginModal(props) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const loginRef = useRef(null);
  const [loginBtn, setLoginBtn] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginBtn(false);
    // console.log(usernameRef.current.value);

    login(usernameRef.current.value, passwordRef.current.value).then((res) => {
      if (res.ok) {
        setCookie("accessToken", res.data.accessToken);
        window.location.href = "/dashboard";
      } else {
        toast.error(res?.message ? res.message : "Login Fail!");
        removeCookie("accessToken");
      }
      setLoginBtn(true);
    });
  };
  useEffect(() => {
    const login = loginRef.current;

    const animation = gsap.from(login, {
      opacity: 0,
      duration: 2,
    });

    return () => {
      animation.kill();
    };
  }, []);
  return (
    <div className="login" ref={loginRef}>
      <div className="login-container">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            padding: "1rem",
          }}
        >
          <HighlightOffIcon className="link" onClick={props.closeModal} />
        </div>
        <img src={logo} alt="logo" className="modal-logo" />
        <p>Welcome back Entrepreneur!</p>
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            label="Username"
            inputRef={usernameRef}
          />
          {/* <TextField variant="outlined" label="E-mail" type="email" /> */}
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            inputRef={passwordRef}
          />
          <p className="link">forgot your password ?</p>
          <Button variant="contained" type="submit" disabled={!loginBtn}>
            Login
          </Button>
          <span>
            don't have an account ?{" "}
            <span className="link" onClick={props.handleSignupActive}>
              Sign up
            </span>
          </span>
        </form>
      </div>
    </div>
  );
}
