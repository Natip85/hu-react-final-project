import {
  editUser,
  getUserById,
  passwordChange,
  uploadAvatar,
} from "../api/apiServices";
import { ChangeEvent, useEffect, useState } from "react";
import Title from "../components/Title";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { countryCoordinates } from "../interfaces/IUserType";
import { toast } from "react-toastify";
import { getUser } from "../auth/TokenManager";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
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
  const [passChange, setPassChange] = useState("");
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const myUser = getUser();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [open, setOpen] = useState(false);

  const handleOpen = (arg: any) => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      previewFile(e.target.files[0]);
    }
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
  };

  useEffect(() => {
    getUserById().then((json) => {
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

  function passValidate() {
    const emailRe =
      /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/; //eslint-disable-line
    if (!emailRe.test(passChange)) {
      toast.error("A valid email address is required.");
      return false;
    }
    return true;
  }

  function handlePassChange() {
    if (!passValidate()) return;
    passwordChange({
      email: passChange,
    }).then((json) => {
      toast.success(json.message);
      if (json.error) {
        toast.error(json.error);
      }
    });
  }

  function handleUpload() {
    uploadAvatar( {
      image: selectedFile,
    }).then((json) => {
      console.log(json);
      handleClose();
      toast.success("Avatar changed.");
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
            <div style={{ height: "30%" }}>
             
              <img
                style={{
                  width: "90%",
                  height: "100%",
                  borderRadius: "50%",
                  position: "relative",
                  cursor: "pointer",
                }}
                alt="profile-avatar"
                src={
                  myUser.image
                    ? require(`../../backend/uploads/${myUser.image}`)
                    : "https://cdn-icons-png.flaticon.com/512/610/610120.png"
                }
                
              />
            </div>
            <Button variant="text" onClick={handleOpen} className="loginLink">
              Change profile pic
            </Button>
            <h3>{firstName}</h3>
            <p style={{ color: "grey" }}>{myUser.email}</p>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form>
              <Box sx={style}>
                <Typography
                  sx={{ textAlign: "center" }}
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                >
                  Choose your avatar
                </Typography>

                <Box
                  sx={{
                    textAlign: "center",
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button
                    sx={{ marginBottom: 5 }}
                    variant="contained"
                    component="label"
                  >
                    Upload Avatar
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>

                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        textAlign: "center",
                      }}
                    />
                  )}
                  <Button
                    sx={{ marginTop: 3 }}
                    onClick={handleUpload}
                    variant="text"
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </form>
          </Modal>
        </div>

        <div style={{ flex: 2 }}>
          <Title mainText="PROFILE DETAILS" />
          <form
            onSubmit={handleSubmit}
            style={{ width: "90%", margin: "50px auto" }}
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
              style={{ width: "100%", marginTop: 50 }}
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
