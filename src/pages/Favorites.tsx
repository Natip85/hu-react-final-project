import React, { useEffect, useState } from "react";
import { Card } from "../interfaces/ICardType";
import { getFavorites } from "../api/apiServices";
import Title from "../components/Title";
import { Grid } from "@mui/material";
import BusinessCard from "../components/BusinessCard";
import { SearchContext } from "../hooks/SearchContext";

const Favorites = () => {
  const [favCards, setFavCards] = useState<Array<Card>>([]);
    const { searchValue } = React.useContext(SearchContext);
  const [filteredData, setFilteredData] = React.useState<Array<Card>>([]);

  useEffect(() => {
    getFavorites().then((json) => {
      setFavCards(json);
    });
  }, []);

    React.useEffect(() => {
    const filtered = favCards.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchValue, favCards]);

  return (
    <>
      <Title mainText="My favorite business cards" />
      <div style={{ paddingBottom: 500 }}>
        <Grid sx={{ justifyContent: "center" }} container>
          {!filteredData || (filteredData.length === 0 && <div>No cards to display</div>)}
          {filteredData.map((card) => (
            <BusinessCard key={card._id} {...card} cardId={card._id} />
          ))}
        </Grid>
      </div>

      
    </>
  );
};

export default Favorites;
