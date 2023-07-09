import React, { useState, useEffect, useRef, useContext } from "react";
import Logout from "../auth/Logout";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { getUser } from "../auth/TokenManager";

type Props = {};

const UserAreaDropdown = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
   const context = useContext(AppContext);
   const myUser = getUser()

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const closeit = () => {
    setIsOpen(false);
  };



  return (
    <div>
      <img
        onClick={toggleDropdown}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          position: "relative",
          cursor: "pointer",
        }}
        src={myUser.image ? require(`../../backend/uploads/${myUser.image}`) : "https://cdn-icons-png.flaticon.com/512/610/610120.png"}
        alt="profile-pic"
      />
      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            right: '.2%',
            backgroundColor: "white",
            border: "1px solid black",
            padding: 20,
            borderRadius: 5,
          }}
        >
          <ul style={{ listStyle: "none" }}>
            <li style={{ marginBottom: 10 }}>
              {" "}
              <Link to={`/profile/${context?.user}`}>
              <Button onClick={closeit}
                sx={{
                  color: "black",
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                variant="outlined"
              >
                MY PROFILE
              </Button>
              </Link>
            </li>
            <li onClick={closeit}>
              <Logout />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserAreaDropdown;
