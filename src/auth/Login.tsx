import React, { FormEvent, useContext } from "react";
import Title from "../components/Title";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useTextInput } from "../hooks/useTextInput";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/apiServices";
import { toast } from "react-toastify";
import { setToken, setUser } from "./TokenManager";
import { AppContext } from "../App";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const emailProp = useTextInput("");
  const passwordProp = useTextInput("");
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function validate(): boolean {
    const emailRe =/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/; //eslint-disable-line
    if (!emailRe.test(emailProp.value)) {
      toast.error("A valid email address is required.");
      return false;
    }

    if (!passwordProp.value || passwordProp.value.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return false;
    }
    return true;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    login({
      email: emailProp.value,
      password: passwordProp.value,
    }).then((user) => {
      setUser(user);
      if (user.err) {
        toast.error(user.err);
      }
      if (user.error) {
        toast.error(user.error);
      } else {
        setToken(user.token);
        localStorage.setItem("admin", JSON.stringify(user.admin));
        navigate("/");
        toast.success("Login successfull.");
        if (context) {
          context.setAdmin(user.admin || false);
          context.setUserName(user.firstName);
          context.setBusiness(user.business);
          context.setUser(user._id);
        }
      }
    });
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div style={{ height: "100vh" }}>
      <Title mainText="LOGIN" />
      <form
        style={{ width: "50%", margin: "auto", padding: 20 }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            width: "100%",
            height: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <TextField
            required
            style={{ width: "100%", marginRight: 5 }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            {...emailProp}
          />
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              {...passwordProp}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        <Button type="submit" style={{ width: "100%" }} variant="contained">
          Login
        </Button>
      </form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Dont have an account yet?{" "}
        <Link className="loginLink" to="/signup">
          Sign-up here
        </Link>
      </div>
    </div>
  );
};

export default Login;
