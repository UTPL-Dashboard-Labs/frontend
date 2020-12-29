import {
  Button,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./login-form.css";
export default function LoginForm() {
  const [showError, setShoeError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const history = useHistory();
  const Login = (e) => {
    e.preventDefault();
    setShoeError(!showError);
  };
  return (
    <form
      className="login-form"
      onSubmit={(e) => {
        Login(e);
      }}
    >
      <Grid container spacing={1} justify="center" direction="column" alignItems="center">
        <Grid item xs={12}>
          <TextField id="standard-basic" label="Email" variant="filled" className='email-input'/>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="filled">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <FilledInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={""}
              onChange={() => {}}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          {showError && <p className="error-mesage">*Error</p>}
        </Grid>
        <Grid item xs={12}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            LOGIN
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
