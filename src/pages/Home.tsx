import "./home.css";
import { useContext, useEffect, useState } from "react";
import { getCards } from "../api/apiServices";
import { Card } from "../interfaces/ICardType";
import BusinessCard from "../components/BusinessCard";
import Title from "../components/Title";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, Link } from "@mui/material";
import { SearchContext } from "../hooks/SearchContext";


const Home = () => {
  const [cards, setCards] = useState<Array<Card>>([]);
  const [displayMode, setDisplayMode] = useState("grid");
  const [filteredData, setFilteredData] = useState<Array<Card>>([]);
   const { searchValue } = useContext(SearchContext);


  useEffect(() => {
    getCards().then((json) => {
      setCards(json);
     setFilteredData(json)
    });
  }, []);

  useEffect(() => {
    const filtered = cards.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchValue, cards]);


  function handleDisplayChange(mode: string) {
    setDisplayMode(mode);
  }

  return (
    <>
      <Title mainText="Find a business today!" subText="Check out our top businesses." />


      
      <div
        style={{
          overflowY: "auto",
          maxWidth: "75vw",
          margin: "50px auto",
          display: "flex",
          justifyContent: "center",
        }}
        className={displayMode}
      >
        <div>
        <Button  onClick={() => handleDisplayChange("list")}>
          List
          <FormatListBulletedIcon />
        </Button>
        <Button onClick={() => handleDisplayChange("grid")}>
          Grid
          <ViewModuleIcon />
        </Button>
      </div>
        {!cards || (cards.length === 0 && <div>No cards to display</div>)}
   

        {displayMode === "list" && (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Card number</TableCell>
                    <TableCell align="right">Image</TableCell>
                    <TableCell align="right">Title</TableCell>
                    <TableCell align="right">Subtitle</TableCell>
                    <TableCell align="right">Phone</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cards.map((row) => (
                   
                    <TableRow
                      
                      key={row._id}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                          margin: 10,
                        },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.cardNumber}
                      </TableCell>

                      <TableCell align="right">
                        <img
                          style={{ width: 150 }}
                          src={row.imageUrl}
                          alt={row.imageAlt}
                        />{" "}
                      </TableCell>

                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.subtitle}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.street}</TableCell>
                      <TableCell align="right">
                        <Link href={`/card-details/${row._id}`}>
                        <Button size="small" variant="contained" color="primary">
                          Contact Us
                        </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        {displayMode === "grid" && (
          <>

          {!filteredData || (filteredData.length === 0 && <div>No cards to display</div>)}

          <Grid sx={{justifyContent: 'center'}} container>
            {filteredData.map((card) => (
              <BusinessCard key={card._id} {...card} cardId={card._id} />
            ))}
            </Grid>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
