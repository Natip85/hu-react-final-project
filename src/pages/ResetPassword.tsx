import { Box, Button, CircularProgress, Link, Stack, TextField } from "@mui/material";
import React from "react";
import { getUser } from "../auth/TokenManager";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { actualResetPassword } from "../api/apiServices";

type Props = {};

export const isValidPassword = (password: string) => {
  const passwordRegex = /^(?=.*[!@%$#^&*-_*(])(?=.*[A-Z]).+$/;
  return passwordRegex.test(password);
};

const ResetPassword = (props: Props) => {
    const [loadCircle, setLoadCircle] = React.useState(false);
  const navigate = useNavigate();
  const user = getUser();


  const [password, setPassword] = React.useState("");
  const [passwordLabel, setPasswordLabel] = React.useState("New password *");
  const [passwordErr, setPasswordErr] = React.useState("");
  const [fieldPasswordErr, setfieldPasswordErr] = React.useState(false);

  const [confirmPassword, setconfirmPassword] = React.useState("");
  const [confirmPasswordLabel, setConfirmPasswordLabel] =
    React.useState("Confirm password *");
  const [confirmPasswordErr, setConfirmPasswordErr] = React.useState("");
  const [fieldconfirmPasswordErr, setfieldConfirmPasswordErr] =
    React.useState(false);



  const setPasswordCorrect = (bool: boolean, msg: string = "") => {
    setPasswordErr(bool ? "" : msg);
    setfieldPasswordErr(bool ? false : true);
    setPasswordLabel(bool ? "New password*" : "Error");
  };

  const setConfirmPasswordCorrect = (bool: boolean) => {
    setConfirmPasswordLabel(bool ? "Confirm password*" : "");
    setConfirmPasswordErr(bool ? "" : "The password are not the same!");
    setfieldConfirmPasswordErr(bool ? false : true);
  };

  const validateButtonCheck = () => {
   
    password.length < 6
      ? setPasswordCorrect(false, "Password must be atleat 6 chars")
      : setPasswordCorrect(true);
    password !== confirmPassword || confirmPassword.length < 1
      ? setConfirmPasswordCorrect(false)
      : setConfirmPasswordCorrect(true);
  };

  const validate = (): boolean => {
   

    !isValidPassword(password) || password.length < 6
      ? setPasswordCorrect(
          false,
          "Password must be atleat 6 chars, password must contain !@%$#^&*-_* and one Capital letter"
        )
      : setPasswordCorrect(true);

    password !== confirmPassword
      ? setConfirmPasswordCorrect(false)
      : setConfirmPasswordCorrect(true);

       const passRegex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d.*\d.*\d)(?=.*[!@#$%^&*()_\-+=?]).{8,}$/; //eslint-disable-line
    if (!password || !passRegex.test(password)) {
      toast.error(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 4 numbers and 1 special character."
      );
      return false;
    }
    if (
      !password ||
      password.length < 6 ||
      !isValidPassword(password) ||
      password !== confirmPassword 
    ) {
      return false;
    }
    return true;
  };

  const handleClick = () => {
    if (!validate()) {
      toast.error("Please enter the details correctly ");
      validateButtonCheck();
      return;
    }

    actualResetPassword(user._id , {
      password,
    })
      .then((user) => {
        setLoadCircle(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
  };

  return (
    <>
      <Link href={`/profile/${user._id}`}>
        <Button variant="contained">Back to my profile</Button>
      </Link>

      <Box sx={{margin: '100px auto', display: 'flex', flexDirection: 'column', width: '30%'}} >
        <TextField
        type="password"
        sx={{marginBottom: 3}}
          label={passwordLabel}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldPasswordErr}
          helperText={passwordErr}
        />

        <TextField
                type="password"
        sx={{marginBottom: 5}}
          label={confirmPasswordLabel}
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
          error={fieldconfirmPasswordErr}
          helperText={confirmPasswordErr}
        />

        <Button onClick={handleClick} variant="contained">
          
          Submit 
          {loadCircle && (
          <>
         <Stack sx={{ color: "grey.500", marginLeft: "10px" }} spacing={2} direction="row">
    
      <CircularProgress color="secondary" size={20} />
     
    </Stack> 
    </>
    )}
    </Button>
      </Box>
    </>
  );
};

export default ResetPassword;
