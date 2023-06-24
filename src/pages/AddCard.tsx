import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { addCard } from "../api/apiServices";
import { useTextInput } from "../hooks/useTextInput";
import { toast } from "react-toastify";
import { AppContext } from "../App";
import { countryCoordinates } from "../interfaces/IUserType";
import { getUser } from "../auth/TokenManager";

const AddCard = () => {
  const navigate = useNavigate();
  const titleProp = useTextInput("");
  const subtitleProp = useTextInput("");
  const descriptionProp = useTextInput("");
  const phoneProp = useTextInput("");
  const emailProp = useTextInput("");
  const webProp = useTextInput("");
  const imageUrlProp = useTextInput("");
  const imageAltProp = useTextInput("");
  const stateProp = useTextInput("");
  // const countryProp = useTextInput("");
   const [country, setCountry] = useState("");
  const cityProp = useTextInput("");
  const streetProp = useTextInput("");
  const houseNumberProp = useTextInput("");
  const zipProp = useTextInput("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
   const context = useContext(AppContext);

     const myUser = getUser()
     
     useEffect(() => {
    if(context){
      context.setUser(context?.user)
      
    }
  }, []);

  function validate(): boolean {
    if (!titleProp.value || titleProp.value.length < 2) {
      toast.error("Title is required.");
      return false;
    }
    if (!subtitleProp.value || subtitleProp.value.length < 2) {
      toast.error("Subtitle is required.");
      return false;
    }
    if (!descriptionProp.value) {
      toast.error("Description is required.");
      return false;
    }
    if (!phoneProp.value) {
      toast.error("A valid phone number is required.");
      return false;
    }

    // eslint-disable-next-line no-useless-escape
    const emailRe =/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
    if (!emailRe.test(emailProp.value)) {
      toast.error("A valid email address is required.");
      return false;
    }
    // if (!countryProp.value) {
    //   toast.error("Please select a country.");
    //   return false;
    // }
    if (!cityProp.value) {
      toast.error("Please select a city.");
      return false;
    }
    if (!streetProp.value) {
      toast.error("Street name is required.");
      return false;
    }
    if (!houseNumberProp.value) {
      toast.error("House number is required.");
      return false;
    }

    return true;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    addCard({
      title: titleProp.value,
      subtitle: subtitleProp.value,
      description: descriptionProp.value,
      phone: phoneProp.value,
      email: emailProp.value,
      web: webProp.value,
      imageUrl: imageUrlProp.value,
      imageAlt: imageAltProp.value,
      state: stateProp.value,
      country: country,
      city: cityProp.value,
      street: streetProp.value,
      houseNumber: houseNumberProp.value,
      zip: zipProp.value,
      userId: myUser._id,
      lat: lat,
      lng: lng,
    }).then((user) => {

      if (user.error) {
        toast.error(user.error);
      } else {
        toast.success("Card successfully added.");
        navigate('/mycards')
      }
    });
  }

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
    let selectedCountry = event.target.value;
    let result = countryCoordinates.filter(
      (item) => item.name === selectedCountry
    );

    setLat(result[0].coordinates.latitude);
    setLng(result[0].coordinates.longitude);
  };

  return (
    <>
      <Title mainText="CREATE A BUSINESS CARD" />

      <form onSubmit={handleSubmit} className="formWrap" style={{padding: 50, marginBottom: 100}}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <TextField
            required
            style={{ width: "50%", marginRight: 5 }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            {...titleProp}
          />
          <TextField
            required
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Subtitle"
            variant="outlined"
            {...subtitleProp}
          />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <TextField
            required
            style={{ width: "50%", marginRight: 5 }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            {...descriptionProp}
          />
          <TextField
            required
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            {...phoneProp}
          />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <TextField
            required
            style={{ width: "50%", marginRight: 5 }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            {...emailProp}
          />
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Web"
            variant="outlined"
            {...webProp}
          />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <TextField
            style={{ width: "50%", marginRight: 5 }}
            id="outlined-basic"
            label="imageUrl"
            variant="outlined"
            {...imageUrlProp}
          />
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="imageAlt"
            variant="outlined"
            {...imageAltProp}
          />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <TextField
            style={{ width: "50%", marginRight: 5 }}
            id="outlined-basic"
            label="State"
            variant="outlined"
            {...stateProp}
          />
          <Box sx={{ width: '50%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                label="Country"
                onChange={handleChange}
              >
                {countryCoordinates.map((country, index) => (
                  <MenuItem  key={index} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <TextField
            required
            style={{ width: "50%", marginRight: 5 }}
            id="outlined-basic"
            label="City"
            variant="outlined"
            {...cityProp}
          />
          <TextField
            required
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Street"
            variant="outlined"
            {...streetProp}
          />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <TextField
            required
            style={{ width: "50%", marginRight: 5 }}
            id="outlined-basic"
            label="House number"
            variant="outlined"
            {...houseNumberProp}
          />
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Zip"
            variant="outlined"
            {...zipProp}
          />
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <div style={{ width: "50%", marginRight: 3 }}>
            <Link to="/mycards">
              <Button style={{ width: "100%" }} variant="contained">
                Cancel
              </Button>
            </Link>
          </div>
          <div style={{ width: "50%", marginLeft: 3 }}>
            <Button type="submit" style={{ width: "100%" }} variant="contained">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddCard;
