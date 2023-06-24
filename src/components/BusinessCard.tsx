import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Divider, Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import { verifyToken } from "../auth/TokenManager";
import { changeFav } from "../api/apiServices";
import { useEffect, useState } from "react";

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

const BusinessCard = ({
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
  const [active, setActive] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("red");
    if (data !== null) setActive(JSON.parse(data));
  }, []);

  function callNumber(number: any) {
    window.location.href = `tel:${phone}`;
  }

  async function handleFavClick() {
    await changeFav(cardId as string);
    setActive(!active);
  }

  return (
    <div style={{ margin: 10, height: "450px" }}>
      <Card
        sx={{
          maxWidth: 300,
          minWidth: 300,
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
                <b>Address:</b> {houseNumber} {street}, <br/>
                {city}
              </h4>
              <h4>
                <b>Card number:</b> {phone}
              </h4>
           
            </CardContent>
             
        </CardActionArea>
        </Link>
        <CardActions>
          <div
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
                  <FavoriteIcon style={{ color: active ? "red" : "" }} />
                </Button>
                
              </>
            )}
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default BusinessCard;
