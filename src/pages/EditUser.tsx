import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import { countryCoordinates } from "../interfaces/IUserType";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { editUser, getOneUserById } from '../api/apiServices';
import { toast } from 'react-toastify';


const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate()
   const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [zip, setZip] = useState("");
  const [business, setBusiness] = useState(false);
  const label = { inputProps: { "aria-label": "Switch demo" } };
 
  useEffect(()=>{
    if (!id) return;

    getOneUserById(id).then((json) => {
      setFirstName(json.firstName as string);
      setMiddleName(json.middleName as string);
      setLastName(json.lastName as string);
      setPhone(json.phone as string);
      setState(json.state as string);
      setCountry(json.country as string);
      setCity(json.city as string);
      setStreet(json.street as string);
      setHouseNumber(json.houseNumber as string);
      setZip(json.zip as string);
      setBusiness(json.business || false);
    });
    
  }, [id])

  function handleSubmit(){
 if (!id) return;

    editUser(id, {
      firstName,
      middleName,
      lastName,
      phone,
      state,
      country,
      city,
      street,
      houseNumber,
      zip,
      business,
    }).then((json) => {
      toast.success("User edited successfully.");
      navigate('/sandbox')
    });
  }
  
  return (
     <div style={{ height: "100vh" }}>
      <Title mainText="EDIT USER" />
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
        <div style={{display: 'flex', width: '100%'}}>
           <div style={{ width: "50%", marginRight: 3 }}>
            <Link to="/sandbox">
              <Button style={{ width: "100%" }} variant="contained">
                Cancel
              </Button>
            </Link>
          </div>
           <div style={{ width: "50%", marginRight: 3 }}>
        <Button
          onClick={handleSubmit}
          style={{ width: "100%" }}
          variant="contained"
        >
          Update
        </Button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default EditUser