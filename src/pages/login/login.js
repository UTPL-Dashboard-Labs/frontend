import React from "react";
import Particles from "react-particles-js";
import LoginForm from "../../components/login/login-form";
import "./login.css";
export default function Login() {
  return (
    <div className="login-screen">
      <h1>UTPL Dashboards Labs</h1>
      <div className="particles-js">
        <Particles
          height="100vh"
          style={{ zIndex: "0" }}
          params={{
            particles: {
              number: {
                value: 50,
              },
              size: {
                value: 5,
              },
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse",
                },
              },
            },
          }}
        />
      </div>

      <LoginForm />
    </div>
  );
}
