import { Box, Container, Tab } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { getUser, verifyAdmin, verifyToken } from "../auth/TokenManager";

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

const HeaderLinks = () => {
  const user = getUser();
  // const [value, setValue] = React.useState(0);

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };

  return (
    <Container
      sx={{
        display: "flex",
        px: 2,
        // justifyContent: "space-between",
        alignItems: "center",
        minWidth: "500px",
        // backgroundColor: 'red'
      }}
    >
      <Box>
        {/* <Tabs   > */}
        <Tab
          label="Home"
          to="/"
          sx={{ color: "black", fontSize: "1rem" }}
          component={Link}
        />
        <Tab
          label="About"
          to="/about"
          sx={{ color: "black", fontSize: "1rem" }}
          component={Link}
        />
        {/* </Tabs> */}
      </Box>
      <Box>
          {verifyToken() && (
          <>
            <Tab
              label="My Favorites"
              to="/favorites"
              sx={{ color: "black", fontSize: "1rem" }}
              component={Link}
            />
          </>
        )}
      </Box>
      <Box>
      {user && user.business && (
          <Tab
            label="My Cards"
            to="/mycards"
            sx={{ color: "black", fontSize: "1rem" }}
            component={Link}
          />
      )}

        {verifyAdmin() && (
          <Tab
            label="Admin Area"
            to="/sandbox"
            sx={{ color: "black", fontSize: "1rem" }}
            component={Link}
          />
        )}
      </Box>
    </Container>
  );
};

export default HeaderLinks;
