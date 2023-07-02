import { editUser, getUserById, passwordChange } from "../api/apiServices";
import { useEffect, useState } from "react";
import Title from "../components/Title";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { countryCoordinates } from "../interfaces/IUserType";
import { toast } from "react-toastify";
import { getUser } from "../auth/TokenManager";

const Profile = () => {
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
  const [passChange, setPassChange] = useState("");
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const myUser = getUser();

  useEffect(() => {
    getUserById(myUser._id).then((json) => {
      var cleanBusiness = JSON.stringify(json[0].business).replace(/['"]+/g,"");
      const bzz = JSON.parse(cleanBusiness);

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

  function passValidate(){

    const emailRe =/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/; //eslint-disable-line
    if (!emailRe.test(passChange)) {
      toast.error("A valid email address is required.");
      return false;
    }
    return true
  }
  function handlePassChange() {
    if(!passValidate()) return
    passwordChange({
      email: passChange,
    }).then((json) => {
      toast.success(json.message);
      if (json.error) {
        toast.error(json.error);
      }
    });
  }

  return (
    <>
      <div style={{ height: "100vh", display: "flex" }}>
        <div
          style={{
            display: "flex",
            flex: 1,
            borderRight: "1px solid lightgrey",
          }}
        >
          <div
            style={{ width: "80%", textAlign: "center", margin: " 50px auto" }}
          >
            <img
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                position: "relative",
                cursor: "pointer",
              }}
              src={"https://cdn-icons-png.flaticon.com/512/610/610120.png"}
              alt=""
            />

            <h3>{myUser.firstName}</h3>
            <p style={{ color: "grey" }}>{myUser.email}</p>
          </div>
        </div>

        <div style={{ flex: 2 }}>
          <Title mainText="PROFILE DETAILS" />
          <form
            onSubmit={handleSubmit}
            style={{ width: "90%", margin: "100px auto" }}
          >
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
              />
              <TextField
                style={{ width: "50%" }}
                id="outlined-basic"
                label="Middle name"
                variant="outlined"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
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
              style={{ width: "100%", marginTop: 100 }}
              variant="contained"
            >
              Update
            </Button>
          </form>
        </div>

        <div
          style={{
            flex: 1,
            borderLeft: "1px solid lightgrey",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "90%", margin: "100px auto" }}>
            <h1 style={{ textAlign: "center" }}>Reset password</h1>
            <p style={{ textAlign: "center", marginBottom: 50 }}>
              Enter the email address associated with your account and we'll
              send you a link to reset your password.
            </p>

            <TextField
              required
              style={{ width: "100%" }}
              label="Email"
              variant="outlined"
              value={passChange}
              onChange={(e) => setPassChange(e.target.value)}
            />
            <Button
              onClick={handlePassChange}
              type="submit"
              style={{ width: "100%", marginTop: 20 }}
              variant="contained"
            >
              Send link
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
