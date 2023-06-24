import "./cardDetails.css";
import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCardById } from "../api/apiServices";
import { Card } from "../interfaces/ICardType";
import Title from "../components/Title";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { addEvent, deleteEvent, getEvents } from "../api/apiServices";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import useMediaQuery from "../hooks/useMediaQuery";
import { LatLngTuple } from "leaflet";

export interface EventTypes {
  _id?: string | null;
  date: string;
  title: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CardDetails = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const { id } = useParams();
  const [card, setCard] = useState<Card>();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const navigate = useNavigate();
  const position: LatLngTuple = [lat, lng];
  

  useEffect(() => {
    if (!id) return;

    getCardById(id).then((json) => {
      setCard(json);

      let newone = JSON.stringify(json.lat);
      let mynew = JSON.parse(newone);

      let newone2 = JSON.stringify(json.lng);
      let mynew2 = JSON.parse(newone2);

      setLat(mynew);
      setLng(mynew2);
    });
  }, []);

  const [events, setEvents] = useState<Array<EventTypes>>([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [eventVal, setEventVal] = useState("");
  const handleOpen = (arg: any) => {
    setOpen(true);
    setDate(arg.dateStr);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getEvents().then((json) => {
      setEvents(json);
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newlyAdded = await addEvent({
      title: eventVal,
      date,
    });
    toast.success("Event scheduled.");
    setEvents([...events, newlyAdded]);
    setOpen(false);
    setEventVal("");
  }

  function handleValChange(e: any) {
    setEventVal(e.target.value);
  }

  async function handleEventClick(arg: any) {
    const myId = arg.event._def.extendedProps._id;
    if (
      window.confirm(
        `Are you sure you want to delete the event '${arg.event.title}'`
      )
    ) {
      toast.success("Event deleted.");
      await deleteEvent(myId);
      const updated = [...events].filter((eve) => eve._id !== myId);
      setEvents(updated);
    }
  }

  function callNumber(number: any) {
    window.location.href = `tel:${number}`;
  }

  return (
    <div>
      <Title
        mainText="Business details"
        subText="We cant wait to hear from you!"
      />
      <div style={{ marginBottom: 20, marginLeft: 20 }}>
        <Button onClick={() => navigate("/")} variant="outlined">
          Back
        </Button>
      </div>
      <div
        style={{
          width: "85%",
          margin: "auto",
          padding: 20,
          border: "10px solid black",
          borderRadius: 10,
        }}
      >
        <div></div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <div
            style={{
              width: "40%",
              padding: 75,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <h1>{card?.title}</h1>
            <div>
              <h3>
                {card?.title} {card?.houseNumber}
              </h3>
              <h3>
                {card?.state}, {card?.city} {card?.zip}
              </h3>
            </div>
            <div>
              <h3>
                Call now:{" "}
                <Button onClick={() => callNumber(card?.phone)}>
                  {card?.phone}
                </Button>{" "}
              </h3>
              <span>Website</span>
              <Link to={`${card?.web}`} target="_blank">
                <Button> {card?.title}</Button>
              </Link>
            </div>
          </div>
          <div>
            <img style={{ width: "100%" }} src={card?.imageUrl} alt="" />
          </div>
        </div>
      </div>
      {isAboveMediumScreens ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 20,
              marginBottom: 100,
            }}
          >
            <div style={{ position: "relative", paddingTop: 100 }}>
              <h2 style={{ paddingLeft: 150, position: "absolute", top: 10 }}>
                Reserve a consultation below!
              </h2>
              <div
                style={{
                  width: 650,
                  border: "1px solid black",
                  padding: 20,
                  backgroundColor: "white",
                }}
              >
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  weekends={true}
                  events={events}
                  dateClick={handleOpen}
                  selectable={true}
                  eventClick={handleEventClick}
                />
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <form onSubmit={handleSubmit}>
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Add an event:
                    </Typography>
                    <TextField
                      value={eventVal}
                      onChange={handleValChange}
                      id="outlined-basic"
                      label="Title"
                      variant="outlined"
                    />
                    <Button type="submit">Submit</Button>
                  </Box>
                </form>
              </Modal>
            </div>

            <div style={{ minWidth: "650px", height: "550px", marginTop: 100 }}>
            
              <MapContainer
            center={position}
            zoom={50}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={position}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                <Link to="/add-dish">GO!</Link>
              </Popup>
            </Marker>
          </MapContainer>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 20,
              marginBottom: 100,
            }}
          >
            <div style={{ position: "relative", paddingTop: 100 }}>
              <h2 style={{ paddingLeft: 150, position: "absolute", top: 10 }}>
                Reserve a consultation below!
              </h2>
              <div
                style={{
                  width: 650,
                  border: "1px solid black",
                  padding: 20,
                  backgroundColor: "white",
                }}
              >
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  weekends={true}
                  events={events}
                  dateClick={handleOpen}
                  selectable={true}
                  eventClick={handleEventClick}
                />
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <form onSubmit={handleSubmit}>
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Add an event:
                    </Typography>
                    <TextField
                      value={eventVal}
                      onChange={handleValChange}
                      id="outlined-basic"
                      label="Title"
                      variant="outlined"
                    />
                    <Button type="submit">Submit</Button>
                  </Box>
                </form>
              </Modal>
            </div>

            <div style={{ minWidth: "650px", height: "550px", marginTop: 100 }}>
              <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[51.505, -0.09]}
                  icon={
                    new Icon({
                      iconUrl: require("leaflet/dist/images/marker-icon.png"),
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                    })
                  }
                >
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    <Link to="/add-dish">GO!</Link>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardDetails;