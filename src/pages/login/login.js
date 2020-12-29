import React from "react";
import Particles from "react-particles-js";
import { useHistory } from "react-router-dom";
import LoginForm from "../../components/login/login-form";
import "./login.css";
export default function Login() {
  const history = useHistory()
  return (
    <div className="login-screen">
      <h1>UTPL Dashboards Labs</h1>
      <div className="particles-js">
        <Particles
          params={{
            
            particles: {
              color:'#000000',
              number: {
                value: 100,
              },
              size: {
                value: 5,
              },
              lineLinked:{
                color:'#000000'
              }
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
