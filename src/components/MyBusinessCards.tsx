import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Divider } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import { verifyToken } from "../auth/TokenManager";
import { useContext } from "react";
import { AppContext } from "../App";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { changeFav } from "../api/apiServices";
import { useState } from "react";

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
}: CardProps) => {
  const context = useContext(AppContext);
  const [active, setActive] = useState(false);

  async function handleFavClick() {
    await changeFav(cardId as string);
    setActive(!active);
  }

   function callNumber(number: any) {
    window.location.href = `tel:${phone}`;
  }

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
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={imageUrl}
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
              <b>Address:</b> {street}
              {houseNumber}
              {city}
            </h4>
            <h4>
              <b>Card number:</b> {phone}
            </h4>
          </CardContent>
        </CardActionArea>
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
              <Button onClick={handleFavClick} size="small" color="primary">
                <FavoriteBorderOutlinedIcon style={{ color: active ? "red" : "" }} />
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
