import React, { useContext } from "react";
import { BottomNavigation, BottomNavigationAction, Link } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { AppContext } from "../App";
import { verifyToken } from "../auth/TokenManager";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

type Props = {};

const Footer = (props: Props) => {
  // const [value, setValue] = useState(0);
  const context = useContext(AppContext);

  return (
    <>
      <div style={{ zIndex: 200, }}>
        <BottomNavigation
          showLabels
          sx={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            boxShadow: "2px 2px 10px 3px black",
          }}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
        >
          <BottomNavigationAction
            label="Home"
            icon={
              <Link href="/" >
                <HomeOutlinedIcon />
              </Link>
            }
          />
          <BottomNavigationAction
            label="About"
            icon={
              <Link href="/about" >
                <InfoIcon />
              </Link>
            }
          />
          {verifyToken() && (
            <BottomNavigationAction
              label="Favorites"
              icon={
                <Link href="/favorites">
                  <FavoriteIcon />
                </Link>
              }
            />
          )}
          {context?.business && (
            <BottomNavigationAction
              label="My cards"
              icon={
                <Link href="/mycards" >
                  <AccountBoxOutlinedIcon />
                </Link>
              }
            />
          )}

          {context?.admin && (
            <BottomNavigationAction
              label="Admin"
              icon={
                <Link href="/sandbox">
                  <AdminPanelSettingsIcon />
                </Link>
              }
            />
          )}
        </BottomNavigation>
      </div>
    </>
  );
};

export default Footer;
