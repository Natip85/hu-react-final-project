import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { useNavigate, useParams } from "react-router-dom";
import { editCards, getCardById } from "../api/apiServices";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { countryCoordinates } from "../interfaces/IUserType";

const EditCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [web, setWeb] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    if (!id) return;

    getCardById(id).then((json) => {
      setTitle(json.title as string);
      setSubtitle(json.subtitle as string);
      setDescription(json.description as string);
      setPhone(json.phone as string);
      setEmail(json.email as string);
      setWeb(json.web as string);
      setImageUrl(json.imageUrl as string);
      setImageAlt(json.imageAlt as string);
      setState(json.state as string);
      setCountry(json.country as string);
      setCity(json.city as string);
      setStreet(json.street as string);
      setHouseNumber(json.houseNumber as string);
      setZip(json.zip as string);
    });
  }, [id]);

  function validate(): boolean {
    if (!title || title.length < 2) {
      toast.error("Title is required.");
      return false;
    }
    if (!subtitle || subtitle.length < 2) {
      toast.error("Subtitle is required.");
      return false;
    }
    if (!description || description.length < 5) {
      toast.error("Description is required.");
      return false;
    }
    if (!phone || phone.length < 10) {
      toast.error("A valid phone number is required.");
      return false;
    }

    // eslint-disable-next-line no-useless-escape
    const emailRe = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
    if (!emailRe.test(email)) {
      toast.error("A valid email address is required.");
      return false;
    }
    if (!country) {
      toast.error("Please select a country.");
      return false;
    }
    if (!city) {
      toast.error("Please select a city.");
      return false;
    }
    if (!street) {
      toast.error("Street name is required.");
      return false;
    }
    if (!houseNumber) {
      toast.error("House number is required.");
      return false;
    }

    return true;
  }

  function handleSubmit() {
    if (!validate()) {
      return;
    }
    if (!id) return;

    editCards(id, {
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
    }).then((json) => {
      toast.success("Card edited successfully.");
        navigate(-1);
    });
  }

  return (
    <>
      <Title mainText="EDIT" />

      <div style={{ paddingBottom: 300 }} className="formWrap">
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Subtitle"
            variant="outlined"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            required
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Web"
            variant="outlined"
            value={web}
            onChange={(e) => setWeb(e.target.value)}
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
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="imageAlt"
            variant="outlined"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
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
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          {/* <TextField
            required
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Country"
            variant="outlined"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          /> */}
          <Box sx={{ width: '50%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                label="Country"
                onChange={(e) => setCountry(e.target.value)}
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
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            required
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Street"
            variant="outlined"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
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
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
          />
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Zip"
            variant="outlined"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <div style={{ width: "50%", marginRight: 3 }}>
            <Button
              onClick={() => {
                navigate(-1);
              }}
              style={{ width: "100%" }}
              variant="contained"
            >
              Cancel
            </Button>
          </div>
          <div style={{ width: "50%", marginLeft: 3 }}>
            <Button
              onClick={handleSubmit}
              style={{ width: "100%" }}
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCard;
