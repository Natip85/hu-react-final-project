import React, { useEffect, useState } from "react";
import { Card } from "../interfaces/ICardType";
import { getFavorites } from "../api/apiServices";
import Title from "../components/Title";
import { Box, Container, Grid } from "@mui/material";
import BusinessCard from "../components/BusinessCard";
import { SearchContext } from "../hooks/SearchContext";
import SkeletonCard from "../components/SkeletonCard";

const Favorites = () => {
  const [favCards, setFavCards] = useState<Array<Card>>([]);
  const { searchValue } = React.useContext(SearchContext);
  const [filteredData, setFilteredData] = React.useState<Array<Card>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getFavorites().then((json) => {
      setFavCards(json);
        setFilteredData(json);
    });
  }, []);

  useEffect(() => {
    const filtered = favCards.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchValue, favCards]);


  return (
    <>
      <Title mainText="My favorites" />
      <div style={{ paddingBottom: 500 }}>
        {/* <Grid sx={{ justifyContent: "center" }} container>
          {!filteredData ||
            (filteredData.length === 0 && (
              <div>You have no favorites yet.</div>
            ))}
          {filteredData.map((card) => (
            <div key={card._id}>
              {loading ? (
                <SkeletonCard />
              ) : (
                <BusinessCard key={card._id} {...card} cardId={card._id} />
              )}
            </div>
          ))}
        </Grid> */}
         <Container>
              <Box>
                <Grid container spacing={2}>
                  {filteredData.map((card) => (
                    <Grid item xs={11} sm={6} md={4} key={card._id}>
                      {loading ? (
                        <SkeletonCard />
                      ) : (
                        <BusinessCard
                          key={card._id}
                          {...card}
                          cardId={card._id}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Container>
      </div>
    </>
  );
};

export default Favorites;
