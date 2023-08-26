import { Button } from "@mui/material";
import Navbar from "../components/Navbar";

import posIMG from "../assets/hero-img.svg";
import blob from "../assets/blob.svg";
import { useEffect, useRef, useState } from "react";
import {
  floating,
  slideFromLeft,
  slideFromRight,
} from "../gsapAnimations/animations";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

export default function Home(props) {
  // console.log("props isLoggedIn", props);
  const posImgRef = useRef(null);
  const heroLeftRef = useRef(null);
  const heroRightRef = useRef(null);

  const [loginActive, setLoginActive] = useState(false);
  const [signupActive, setSignupActive] = useState(false);

  const handleLoginActive = () => {
    setLoginActive(!loginActive);
    setSignupActive(false);
  };
  const handleSignupActive = () => {
    setSignupActive(!signupActive);
    setLoginActive(false);
  };

  const closeModal = () => {
    setLoginActive(false);
    setSignupActive(false);
  };

  useEffect(() => {
    const postImg = posImgRef.current;
    const heroLeft = heroLeftRef.current;
    const heroRight = heroRightRef.current;
    floating(postImg);
    slideFromLeft(heroLeft);
    slideFromRight(heroRight);

    return () => {
      floating.kill();
      slideFromLeft.kill();
      slideFromRight.kill();
    };
  }, []);
  return (
    <div className="home">
      <Navbar
        handleLoginActive={handleLoginActive}
        handleSignupActive={handleSignupActive}
        isLoggedIn={props.isLoggedIn}
        userInfo={props.userInfo}
      />
      <div className="home-main">
        <section className="home-section-left" ref={heroLeftRef}>
          <div className="hero-left-text">
            <h1>
              Automate transaction processing to minimize errors and expedite
              operations.
            </h1>
            <h1 id="brand">WEBPOS</h1>
            <p>
              Implement real-time inventory management for accurate stock
              monitoring and automated restocking notifications.
            </p>
            <div>
              <Button variant="contained" color="success">
                Get Started
              </Button>
            </div>
          </div>
        </section>
        <section className="home-section-right" ref={heroRightRef}>
          <div
            className="blob-container"
            style={{ backgroundImage: `url(${blob})` }}
          >
            <img src={posIMG} alt="img" className="posIMG" ref={posImgRef} />
          </div>
        </section>
      </div>
      {loginActive ? (
        <LoginModal
          closeModal={closeModal}
          handleSignupActive={handleSignupActive}
        />
      ) : null}
      {signupActive ? (
        <SignupModal
          closeModal={closeModal}
          handleLoginActive={handleLoginActive}
        />
      ) : null}
    </div>
  );
}
