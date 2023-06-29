import { useParams } from "react-router-dom";
import { editUser, getUserById } from "../api/apiServices";
import { useEffect, useState } from "react";
import Title from "../components/Title";
import {Box,Button,FormControl,InputLabel,MenuItem,Select,Switch,TextField,} from "@mui/material";
import { countryCoordinates } from "../interfaces/IUserType";
import { toast } from "react-toastify";
import { getUser } from "../auth/TokenManager";

const Profile = () => {
  // const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [zip, setZip] = useState("");
  const [business, setBusiness] = useState(false);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const myUser = getUser()
  
  useEffect(() => {
  //   // if (!id) return;
    getUserById(myUser._id).then((json) => {
      var cleanBusiness = JSON.stringify(json[0].business).replace(/['"]+/g, "");
      const bzz = JSON.parse(cleanBusiness)

      setFirstName(json[0].firstName as string);
      setMiddleName(json[0].middleName as string);
      setLastName(json[0].lastName as string);
      setPhone(json[0].phone as string);
      setImageUrl(json[0].imageUrl as string);
      setImageAlt(json[0].imageAlt as string);
      setState(json[0].state as string);
      setCountry(json[0].country as string);
      setCity(json[0].city as string);
      setStreet(json[0].street as string);
      setHouseNumber(json[0].houseNumber as string);
      setZip(json[0].zip as string);
      setBusiness(bzz);
    });
  }, [myUser._id]);

  function validate(): boolean {
    if (!firstName || firstName.length < 2) {
      toast.error("First name is required.");
      return false;
    }
    if (!lastName || lastName.length < 2) {
      toast.error("Last name is required.");
      return false;
    }
    if (!phone) {
      toast.error("A valid phone number is required.");
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
      toast.error("Address is required.");
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
    if (!myUser._id) return;

    editUser(myUser._id, {
      firstName,
      middleName,
      lastName,
      phone,
      imageUrl,
      imageAlt,
      state,
      country,
      city,
      street,
      houseNumber,
      zip,
      business,
    }).then((json) => {
      toast.success("User edited successfully.");
    });
  }

  return (
    <div style={{ height: "100vh" }}>
      <Title mainText="MY DETAILS" />
      <form onSubmit={handleSubmit} className="formWrap">
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
            label="First name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            // {...firstNameProp}
          />
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Middle name"
            variant="outlined"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            // {...middleNameProp}
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
            label="Last name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            // {...lastNameProp}
          />
          <TextField
            required
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            // {...phoneProp}
          />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        ></div>

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
            // {...imageUrlProp}
          />
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="imageAlt"
            variant="outlined"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            // {...imageAltProp}
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
          <Box sx={{ width: "50%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countryCoordinates.map((country, index) => (
                  <MenuItem key={index} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TextField
            required
            style={{ width: "50%", marginRight: 5 }}
            id="outlined-basic"
            label="State"
            variant="outlined"
            value={state}
            onChange={(e) => setState(e.target.value)}
            // {...stateProp}
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
            label="City"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            // {...cityProp}
          />
          <TextField
            required
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Street"
            variant="outlined"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            // {...streetProp}
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
            // {...houseNumberProp}
          />
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Zip"
            variant="outlined"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            // {...zipProp}
          />
        </div>
        <div style={{ width: "100%" }}>
          <Switch
            {...label}
            checked={business}
            onChange={() => setBusiness(!business)}
          />
          <label>Signup as a bussiness</label>
        </div>
        <Button
          onClick={handleSubmit}
          style={{ width: "100%" }}
          variant="contained"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default Profile;
