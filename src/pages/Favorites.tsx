import React, { useEffect, useState } from "react";
import { Card } from "../interfaces/ICardType";
import { getFavorites } from "../api/apiServices";
import Title from "../components/Title";
import { Grid } from "@mui/material";
import BusinessCard from "../components/BusinessCard";

const Favorites = () => {
  const [favCards, setFavCards] = useState<Array<Card>>([]);

  useEffect(() => {
    getFavorites().then((json) => {
      setFavCards(json);
    });
  }, []);

  return (
    <>
      <Title mainText="My favorite business cards" />
      <div style={{ paddingBottom: 500 }}>
        <Grid sx={{ justifyContent: "center" }} container>
          {favCards.map((card) => (
            <BusinessCard key={card._id} {...card} cardId={card._id} />
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Favorites;
