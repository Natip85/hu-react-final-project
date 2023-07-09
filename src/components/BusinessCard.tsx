import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Divider, Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CallSharpIcon from "@mui/icons-material/CallSharp";
import {  getUser, verifyToken } from "../auth/TokenManager";
import {  useState } from "react";
import {  setFavorites } from "../api/apiServices";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { toast } from "react-toastify";

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
  status?: boolean
  favorites?: [] | null
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
  favorites
}: CardProps) => {
  const [isRedHeart, setIsRedHeart] = useState(false);

  React.useEffect(() => {
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


  async function handleSetFavs(id: string){
    await setFavorites(id).then((json)=>{
      json.status
        ? toast.success(`${json.title} Card added to favorites!`)
        : toast.info(`${json.title} Card removed from favorites!`);
    })
  }

   const toggleRed = () => {
    setIsRedHeart(!isRedHeart);
  };

   function sendWhatsApp(number: any) {
    const num = number.replace(/^0|\D/g, '');
    // window.location.href = `https://wa.me/972${num}`;
    window.open(`https://wa.me/972${num}`,"_blank");
  }


  return (
    <div style={{ margin: 10, height: "450px" }}>
      <Card
        sx={{
          // maxWidth: 300,
          // minWidth: 300,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 1,
          boxShadow: '2px 2px 10px 2px gray'
        }}
      >
        <Link  style={{textDecoration: 'none'}} href={`/card-details/${cardId}`}>
          
        <CardActionArea>
         
            <CardMedia
              component="img"
              height="140"
              image={imageUrl ? imageUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
              alt={imageAlt }
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
                <Button onClick={()=>{
                  handleSetFavs(cardId as string)
                   toggleRed();
                }
                } size="small" color="primary">
                  <FavoriteIcon style={{ color: isRedHeart ? "red" : ""}} />
                </Button>
                <Button onClick={()=>sendWhatsApp(phone)}>
                <WhatsAppIcon  />
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
