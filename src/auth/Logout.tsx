import React from "react";
import { removeToken, removeUser, verifyAdmin, verifyToken } from "./TokenManager";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Logout = () => {
  const navigate = useNavigate();

  function handleClick() {
    removeToken();
    verifyToken()
    verifyAdmin()
    removeUser()
    localStorage.removeItem("admin");
    navigate("/login");
  }

  return (
    <Button
      sx={{
        color: "black",
      }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
      }}
      onClick={handleClick}
      variant="outlined"
      startIcon={<LogoutIcon />}
    >
      Logout
    </Button>
  );
};

export default Logout;
