import { TextField, Button } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import gsap from "gsap";
import logo from "../assets/logo.png";
import { useEffect, useRef } from "react";
import { register } from "../api/api";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

export default function SignupModal(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const loginRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const password_confirmationRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const password_confirmation = password_confirmationRef.current.value;

    // console.log(name, email, password);

    register(name, email, password, password_confirmation).then((res) => {
      if (res.ok) {
        toast.success(res.message);
        props.closeModal();
        const accessToken = res.data.accessToken;
        setCookie("accessToken", accessToken);
        setCookie("username", res.data.name);
        setCookie("email", res.data.email);
        // sessionStorage.setItem("accessToken", accessToken);
        // sessionStorage.setItem("username", res.data.name);
        // sessionStorage.setItem("email", res.data.email);
        window.location.href = "/dashboard";
      } else {
        const errors = res.errors;
        Object.keys(errors).forEach((key) => {
          res.errors[key].map((err) => {
            return toast.error(err);
          });
        });
      }
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
        <p>Ready for the future ?</p>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Username"
            inputRef={usernameRef}
          />
          <TextField
            variant="outlined"
            label="E-mail"
            type="email"
            inputRef={emailRef}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            inputRef={passwordRef}
          />
          <TextField
            variant="outlined"
            label="Confirm Password"
            type="password"
            inputRef={password_confirmationRef}
          />
          {/* <p className="link">forgot your password ?</p> */}
          <Button variant="contained" type="submit">
            Register
          </Button>
          <span>
            already have an account ?{" "}
            <span className="link" onClick={props.handleLoginActive}>
              Login
            </span>
          </span>
        </form>
      </div>
    </div>
  );
}
