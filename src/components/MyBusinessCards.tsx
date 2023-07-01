import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Divider, Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import { getUser, verifyToken } from "../auth/TokenManager";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { useState } from "react";
import { setFavorites } from "../api/apiServices";

export interface CardProps {
  _id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: string;
  imageUrl?: string;
  imageAlt?: string;
  state?: string;
  country?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  zip?: string;
  timestamps?: string;
  cardId?: string;
  favorites?: [] | null;
}

const MyBusinessCard = ({
  _id,
  title,
  subtitle,
  description,
  phone,
  email,
  web,
  imageUrl,
  imageAlt,
  state,
  country,
  city,
  street,
  houseNumber,
  zip,
  timestamps,
  cardId,
  favorites,
}: CardProps) => {
  const context = useContext(AppContext);
  const [isRedHeart, setIsRedHeart] = useState(false);

  useEffect(() => {
    const ifCardIsFavorite = (userId: string | null | undefined) => {
      favorites?.forEach((id) => {
        if (id === userId) {
          setIsRedHeart(true);
        }
      });
    };
    const userObject = getUser();
    if (userObject) {
      ifCardIsFavorite(userObject._id);
    }
  }, [favorites]);

  function callNumber(number: any) {
    window.location.href = `tel:${phone}`;
  }

  async function handleSetFavs(id: string) {
    await setFavorites(id).then((json) => {});
  }

  const toggleRed = () => {
    setIsRedHeart(!isRedHeart);
  };

  return (
    <div style={{ margin: 10, height: "400px" }}>
      <Card
        sx={{
          maxWidth: 345,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 1,
        }}
      >
         <Link  style={{textDecoration: 'none'}} href={`/card-details/${cardId}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={imageUrl ? imageUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
            alt={imageAlt}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title} <br />
              <small>{subtitle}</small>
            </Typography>

            <Typography variant="body2" color="text.secondary"></Typography>
            <Divider style={{ marginBottom: 20 }} />
            <h4 style={{ marginBottom: 5 }}>
              <b>Phone:</b> {phone}
            </h4>
            <h4 style={{ marginBottom: 5 }}>
              <b>Address:</b> {houseNumber} {street},<br/>
              {city}
            </h4>
            <h4>
              <b>Card number:</b> {phone}
            </h4>
          </CardContent>
        </CardActionArea>
        </Link>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: 40,
          }}
        >
          <Button onClick={callNumber} size="small" color="primary">
            <CallSharpIcon />
          </Button>
          {verifyToken() && (
            <>
              <Button
                onClick={() => {
                  handleSetFavs(cardId as string);
                  toggleRed();
                }}
                size="small"
                color="primary"
              >
                <FavoriteIcon style={{ color: isRedHeart ? "red" : "" }} />
              </Button>
            </>
          )}
          {context?.business && (
            <>
              <DeleteButton cardId={_id as string} />

              <EditButton cardId={_id as string} />
            </>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default MyBusinessCard;
