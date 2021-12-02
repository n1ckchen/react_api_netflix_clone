import React, { useState, useEffect } from "react";
import "./Nav.css";

function Nav() {
  const [show, setshow] = useState(false);
  //show the nv bar when we scroll down to the 100 line
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setshow(true);
      } else setshow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    //if show is true, we have class nav-black
    <div className={`nav ${show && "nav-black"}`}>
      <img
        className="nav-logo"
        src="https://raw.githubusercontent.com/karlhadwen/netflix/54ead17f6b8a240b4ab0d2eeff9d1c66c0a6c206/src/logo.svg"
        alt="Netflix Logo"
      />
      <img
        className="nav-avatar"
        src="https://ih0.redbubble.net/image.618379802.1473/flat,1000x1000,075,f.u2.jpg"
        alt="Netflix Logo"
      />
    </div>
  );
}

export default Nav;
