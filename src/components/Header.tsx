import { useContext, useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { AppContext } from "../App";
import { NavLink } from "react-router-dom";
import "./header.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { getUser, verifyToken } from "../auth/TokenManager";
import Logout from "../auth/Logout";
import UserAreaDropdown from "./UserAreaDropdown";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { SearchContext } from "../hooks/SearchContext";
import React from "react";
import HeaderLinks from "./HeaderLinks";
import { Link, Box, Tab } from "@mui/material";

interface headerProps {
  isTopOfPage: boolean;
}

const user = getUser();

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.4),
  "&:hover": {
    // backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "80%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

// function getFirstInitial() {
//   const userName = user;
//   const cleanName =
//     userName.firstName?.charAt(0).toUpperCase() + userName.firstName.slice(1);
//   return cleanName;
// }

const Header = ({ isTopOfPage }: headerProps) => {
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const navbarBackground = isTopOfPage ? "blueColor" : "shadow";
  const context = useContext(AppContext);
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <nav className={` navbar ${navbarBackground}`}>
        <div style={{ height: 75 }} className="inner-div">
          {/* LEFT SIDE */}
          <Link style={{textDecoration:"none"}} href="/">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "2rem",
                color: "white",
                backgroundColor: 'black',
                padding: 4
              }}
            >
              <img
                style={{ width: "3rem" }}
                src="https://media.istockphoto.com/id/1165333600/vector/bold-letter-b-logo-design-element-negative-space-style-two-letters-bc-or-cb-initials.jpg?s=612x612&w=0&k=20&c=EPa5zAijUCRwD5sMMd3F1QRCblBGENuYuYLAad__Nxc="
                alt=""
              />
              Card
            </div>
          </Link>

          {/* RIGHT SIDE */}
          {isAboveMediumScreens ? (
            <div style={{ width: "90%" }} className="bigScreenDiv">
              <div className="linksDiv">
                <HeaderLinks></HeaderLinks>
              </div>

              <div className="searchDiv">
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    onChange={handleSearchChange}
                    placeholder="Search…"
                    value={searchValue}
                    sx={{ width: "300px" }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                {verifyToken() && (
                  <>
                    {context?.userName && <div>Hi, {context.userName}</div>}

                    <UserAreaDropdown />
                  </>
                )}
                {!verifyToken() && (
                  <Box sx={{ minWidth: "200px" }}>
                    <Tab
                      label="Login"
                      href="/login"
                      sx={{ color: "black", fontSize: "1rem" }}
                      component={Link}
                    />
                    <Tab
                      label="SignUp"
                      href="/signup"
                      sx={{ color: "black", fontSize: "1rem" }}
                      component={Link}
                    />
                  </Box>
                )}
              </div>
            </div>
          ) : (
            <>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={handleSearchChange}
                  placeholder="Search…"
                  value={searchValue}
                  sx={{ width: "300px" }}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <button
                className="hamburger"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <MenuIcon />
              </button>
            </>
          )}
        </div>
        {/* MOBILE MENU MODAL*/}
        {!isAboveMediumScreens && isMenuToggled && (
          <div
            style={{
              width: "275px",
              background: "#1976D2",
              position: "fixed",
              right: 0,
              bottom: 0,
              top: 0,
              boxShadow: "1px 1px 3px gray",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* ~CLOSE ICON*/}
            <div
              style={{
                marginTop: 75,
                display: "flex",
                justifyContent: "end",
                paddingRight: 30,
              }}
            >
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <CloseIcon />
              </button>
            </div>
            {/* ~MENU ITEMS*/}
            <div className="menuItems">
              <NavLink to="/about">ABOUT</NavLink>
              {context?.business && <NavLink to="/mycards">MY CARDS</NavLink>}
              {verifyToken() && (
                <>
                  <NavLink to="/favorites">FAV CARDS</NavLink>

                  {context?.admin && <NavLink to="/sandbox">SANDBOX</NavLink>}
                </>
              )}
              {!verifyToken() ? (
                <>
                  <NavLink to="/signup">SIGNUP</NavLink>
                  <NavLink to="/login">LOGIN</NavLink>
                </>
              ) : (
                <>
                  <Logout />
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
