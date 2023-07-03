import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Typography,
  Box,
  useTheme,
  AppBar,
  Tabs,
  Tab,
} from "@mui/material";
import { deleteCard, deleteUser, getCards, getUsers } from "../api/apiServices";
import { User } from "../interfaces/IUserType";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { SearchContext } from "../hooks/SearchContext";
import EditIcon from "@mui/icons-material/Edit";
import { Card } from "../interfaces/ICardType";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const Sandbox = () => {

  const [users, setUsers] = useState<Array<User>>([]);
  const [cards, setCards] = useState<Array<Card>>([]);
  const [filteredData, setFilteredData] = useState<Array<User>>([]);
  const [filteredCardData, setFilteredCardData] = useState<Array<Card>>([]);
  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    getUsers().then((json) => {
      setUsers(json);
      setFilteredData(json);
    });
  }, []);

  useEffect(() => {
    getCards().then((json) => {
      setCards(json);
      setFilteredCardData(json);
    });
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (item) =>
        item.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.firstName?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchValue, users]);

  useEffect(() => {
    const filtered = cards.filter(
      (item) =>
        item.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCardData(filtered);
  }, [searchValue, cards]);

  async function handleDelete(_id: string) {
    if (window.confirm(`Are you sure to delete ${_id}?`)) {
      await deleteUser(_id);

      const updated = [...users].filter((user) => user._id !== _id);
      setUsers(updated);

      toast.success("User has been deleted.");
    }
  }


  async function handleCardDelete(_id: string){
     if (window.confirm(`Are you sure to delete ${_id}?`)) {
      await deleteCard(_id);

      const updated = [...cards].filter((card) => card._id !== _id);
      setCards(updated);

      toast.success("Card has been deleted.");
  }
  }
  
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Title mainText="ADMIN AREA" />
      <div style={{ paddingBottom: 500 }}>
        <Box
          sx={{
            bgcolor: "background.paper",
            width: "75%",
            position: "relative",
            minHeight: 200,
            margin: "auto",
            marginTop: 10,
          }}
        >
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              <Tab label={`users (${users.length})`} {...a11yProps(0)} />
              <Tab label={`cards (${cards.length})`} {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <Box>
            <TabPanel value={value} index={0} dir={theme.direction}>
              <TableContainer
                component={Paper}
                style={{ width: "100%", margin: "auto" }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID number</TableCell>
                      <TableCell align="right">Admin</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Phone</TableCell>
                      <TableCell align="right">Business</TableCell>
                      <TableCell align="right">Blocked user</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredData.map((row) => (
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
                          {row._id}
                        </TableCell>
                        <TableCell align="right">
                          {JSON.stringify(row.admin) === "true" ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="right"> {row.firstName}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>

                        <TableCell align="right">{row.phone}</TableCell>

                        <TableCell align="right">
                          {row.business ? "Yes" : "No"}
                        </TableCell>

                        <TableCell align="right">
                          {JSON.stringify(row.isBlocked) === "true"
                            ? "Yes"
                            : "No"}
                        </TableCell>
                        <TableCell align="right">
                          {row.admin === true ? (
                            ""
                          ) : (
                            <Button>
                              <Link
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                href={`/edituser/${row._id}`}
                              >
                                <EditIcon />
                              </Link>
                            </Button>
                          )}
                          {row.admin === true ? (
                            ""
                          ) : (
                            <Button
                              onClick={() => handleDelete(row._id as string)}
                            >
                              <DeleteIcon />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
               {!filteredData ||
          (filteredData.length === 0 && (
            <div style={{ textAlign: "center" }}>No users to display</div>
          ))}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <TableContainer
                component={Paper}
                style={{ width: "100%", margin: "auto" }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Card number</TableCell>
                      <TableCell align="right">Image</TableCell>
                      <TableCell align="right">Title</TableCell>
                      <TableCell align="right">Phone</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredCardData.map((row) => (
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
                        <TableCell align="right">
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

                        <TableCell align="right">{row.phone}</TableCell>

                        <TableCell align="right">
                          {row.email}
                        </TableCell>
                        <TableCell align="right">
                        
                            <Button>
                              <Link
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                href={`/edit-card/${row._id}`}
                              >
                                <EditIcon />
                              </Link>
                            </Button>
                            <Button
                              onClick={() => handleCardDelete(row._id as string)}
                            >
                              <DeleteIcon />
                            </Button>
                        
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
               {!filteredCardData ||
          (filteredCardData.length === 0 && (
            <div style={{ textAlign: "center" }}>No cards to display</div>
          ))}
            </TabPanel>
          </Box>
        </Box>

       
      </div>
    </>
  );
};

export default Sandbox;
