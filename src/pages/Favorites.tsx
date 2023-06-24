import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { Card } from "../interfaces/ICardType";
import { getCardsById } from "../api/apiServices";
import Title from "../components/Title";
import MyBusinessCard from "../components/MyBusinessCards";

const Favorites = () => {
  const context = useContext(AppContext);
  const [oGfavCards, setOgFavCards] = useState<Array<Card>>([]);

  useEffect(() => {
    getCardsById(context?.user).then((json) => {
      setOgFavCards(json);
    });
  }, []);


  return (
    <>
      <Title mainText="My favorite business cards" />

      {oGfavCards.map(

        (card) =>
           card.favorite &&
            <MyBusinessCard key={card._id} {...card} cardId={card._id} />
          
      )}
    </>
  );
};

export default Favorites;
