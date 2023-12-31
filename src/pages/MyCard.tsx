import "./mycard.css";
import Title from "../components/Title";
import { createContext, useContext, useEffect, useState } from "react";
import { Card } from "../interfaces/ICardType";
import { deleteCard, getCardsById } from "../api/apiServices";
import MyBusinessCard from "../components/MyBusinessCards";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { getUser } from "../auth/TokenManager";
import { SearchContext } from "../hooks/SearchContext";
import SkeletonCard from "../components/SkeletonCard";

export interface CardContentType {
  onDelete: Function;
  onEdit: Function;
}

export const CardContext = createContext<CardContentType | null>(null);

const MyCard = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Array<Card>>([]);
  const [filteredData, setFilteredData] = useState<Array<Card>>([]);
  const { searchValue } = useContext(SearchContext);
  const myUser = getUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    getCardsById(myUser._id).then((json) => {
      setCards(json);
      setFilteredData(json);
    });
  }, [myUser._id]);

  useEffect(() => {
    const filtered = cards.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchValue, cards]);

  async function onDelete(_id: string) {
    if (window.confirm(`Are you sure to delete ${_id}?`)) {
      await deleteCard(_id);
      const updated = [...cards].filter((card) => card._id !== _id);
      setCards(updated);

      toast.success("Card has been deleted.");
    }
  }

  function onEdit(_id: string) {
    navigate(`/edit-card/${_id}`);
  }

  return (
    <>
      <Title mainText="My cards" />
      <div style={{ paddingBottom: 300 }}>
        {!filteredData ||
          (filteredData.length === 0 && (
            <div style={{ textAlign: "center" }}>No cards to display</div>
          ))}
        <div className="cardsWrap">
          <CardContext.Provider value={{ onDelete, onEdit }}>
            {filteredData.map((card) => (
              <div key={card._id}>
                {loading ? (
                  <SkeletonCard />
                ) : (
                  <MyBusinessCard key={card._id} {...card} cardId={card._id} />
                )}
              </div>
            ))}
          </CardContext.Provider>
        </div>

        <div style={{ position: "absolute", bottom: "12%", right: "5%" }}>
          <Stack direction="row" spacing={2}>
            <Link to="/addcards">
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                variant="contained"
              >
                <AddOutlinedIcon />
              </Button>
            </Link>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default MyCard;
