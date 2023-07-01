import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import "./signUp.css";
import Title from "../components/Title";
import { useTextInput } from "../hooks/useTextInput";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../api/apiServices";
import { countryCoordinates } from "../interfaces/IUserType";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const firstNameProp = useTextInput("");
  const middleNameProp = useTextInput("");
  const lastNameProp = useTextInput("");
  const phoneProp = useTextInput("");
  const emailProp = useTextInput("");
  const passwordProp = useTextInput("");
  const imageUrlProp = useTextInput("");
  const imageAltProp = useTextInput("");
  const stateProp = useTextInput("");
  const cityProp = useTextInput("");
  const streetProp = useTextInput("");
  const houseNumberProp = useTextInput("");
  const zipProp = useTextInput("");
  const [business, setBusiness] = useState(false);
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  function validate(): boolean {
    if (!firstNameProp.value || firstNameProp.value.length < 2) {
      toast.error("First name is required.");
      return false;
    }
    if (!lastNameProp.value || lastNameProp.value.length < 2) {
      toast.error("Last name is required.");
      return false;
    }
    if (!phoneProp.value) {
      toast.error("A valid phone number is required.");
      return false;
    }

    const emailRe =/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/; //eslint-disable-line
    if (!emailRe.test(emailProp.value)) {
      toast.error("A valid email address is required.");
      return false;
    }
    const passRegex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d.*\d.*\d)(?=.*[!@#$%^&*()_\-+=?]).{8,}$/; //eslint-disable-line
    if (!passwordProp.value || !passRegex.test(passwordProp.value)) {
      toast.error(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 4 numbers and 1 special character."
      );
      return false;
    }
    if (!country) {
      toast.error("Please select a country.");
      return false;
    }
    if (!cityProp.value) {
      toast.error("Please select a city.");
      return false;
    }
    if (!streetProp.value) {
      toast.error("Address is required.");
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

    signup({
      firstName: firstNameProp.value,
      middleName: middleNameProp.value,
      lastName: lastNameProp.value,
      phone: phoneProp.value,
      email: emailProp.value,
      password: passwordProp.value,
      imageUrl: imageUrlProp.value,
      imageAlt: imageAltProp.value,
      state: stateProp.value,
      country: country,
      city: cityProp.value,
      street: streetProp.value,
      houseNumber: houseNumberProp.value,
      zip: zipProp.value,
      business,
      lat: lat,
      lng: lng,
    }).then((user) => {
      if (user.error) {
        toast.error(user.error);
      } else {
        navigate("/login");
        toast.success("Signup successfull.");
      }
    });
  }

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
    let selectedState = event.target.value;
    let result = countryCoordinates.filter(
      (item) => item.name === selectedState
    );

    setLat(result[0].coordinates.latitude);
    setLng(result[0].coordinates.longitude);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div style={{ height: "100vh" }}>
      <Title mainText="REGISTER" />
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
            label="First name"
            variant="outlined"
            {...firstNameProp}
          />
          <TextField
            style={{ width: "50%" }}
            label="Middle name"
            variant="outlined"
            {...middleNameProp}
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
            label="Last name"
            variant="outlined"
            {...lastNameProp}
          />
          <TextField
            required
            style={{ width: "50%" }}
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
            label="Email"
            variant="outlined"
            {...emailProp}
          />
          <FormControl sx={{ width: "50%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              {...passwordProp}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
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
            label="imageUrl"
            variant="outlined"
            {...imageUrlProp}
          />

          <TextField
            style={{ width: "50%" }}
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
          <Box sx={{ width: "50%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                label="Country"
                onChange={handleChange}
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
            label="State"
            variant="outlined"
            {...stateProp}
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
            label="City"
            variant="outlined"
            {...cityProp}
          />
          <TextField
            required
            style={{ width: "50%" }}
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
        <div style={{ width: "100%" }}>
          <Switch
            {...label}
            checked={business}
            onChange={() => setBusiness(!business)}
          />
          <label>Signup as a bussiness</label>
        </div>
        <Button type="submit" style={{ width: "100%" }} variant="contained">
          Sign up
        </Button>
      </form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Already have an account?{" "}
        <Link className="loginLink" to="/login">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Signup;
