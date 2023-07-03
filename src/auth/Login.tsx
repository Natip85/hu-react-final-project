import React, {
  FormEvent,
  useContext,
  useState,
} from "react";
import Title from "../components/Title";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useTextInput } from "../hooks/useTextInput";
import { Link, useNavigate } from "react-router-dom";
import { login, passwordChange } from "../api/apiServices";
import { toast } from "react-toastify";
import { setToken, setUser } from "./TokenManager";
import { AppContext } from "../App";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Login = () => {
  const emailProp = useTextInput("");
  const passwordProp = useTextInput("");
  const [resetPassField, setResetPassField] = useState('');
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [showPassword, setShowPassword] = React.useState(false);
const [open, setOpen] = useState(false);
 const handleOpen = (arg: any) => {
    setOpen(true);
  };
const handleClose = () => setOpen(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function validate(): boolean {
    const emailRe =
      /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/; //eslint-disable-line
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

  function passValidate(){

    const emailRe =/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/; //eslint-disable-line
    if (!emailRe.test(resetPassField)) {
      toast.error("A valid email address is required.");
      return false;
    }
    return true
  }
  
  function handleForgotPassSubmit() {
    if(!passValidate()) return
    passwordChange({
      email: resetPassField,
    }).then((json) => {
      toast.success(json.message);
      if (json.error) {
        toast.error(json.error);
      }
    });
  }


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
          marginBottom: 15
        }}
      >
        Dont have an account yet?{" "}
        <Link className="loginLink" to="/signup">
          Sign-up here
        </Link>
      </div>
      <div style={{ textAlign: "center" }}>
        <Link onClick={handleOpen} className="loginLink" to="">
          Forgot password?
        </Link>
        
         <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <form onSubmit={handleForgotPassSubmit}>
                  <Box sx={style}>
                    <Typography
                    sx={{textAlign: 'center'}}
                      id="modal-modal-title"
                      variant="h4"
                      component="h2"
                    >
                      Forgot your password?<br/>
                      <Typography sx={{marginTop: 3}}>Please enter the email you use to sign in to BCard</Typography>
                    </Typography>
                    <TextField
                    sx={{marginBottom: 3, marginTop: 3, width: '100%'}}
                      value={resetPassField}
                      onChange={(e)=>setResetPassField(e.target.value)}
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                    />
                    <Box sx={{textAlign: 'center'}}>
                    <small style={{margin: 'auto'}}>We will send you an email with a link to reset your password.</small>
                    </Box>
                    <Box sx={{textAlign: 'center', marginTop: 3}}>
                    <Button variant="contained" type="submit">Send link</Button>
                    </Box>
                  </Box>
                </form>
              </Modal>
      </div>
    </div>
  );
};

export default Login;
