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
} from "@mui/material";
import { deleteUser, getUsers } from "../api/apiServices";
import { User } from "../interfaces/IUserType";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { SearchContext } from "../hooks/SearchContext";
import EditIcon from "@mui/icons-material/Edit";

const Sandbox = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  // const label = { inputProps: { "aria-label": "Switch demo" } };
  // const [business, setBusiness] = useState(false);
  const [filteredData, setFilteredData] = useState<Array<User>>([]);
  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    getUsers().then((json) => {
      setUsers(json);
      setFilteredData(json);
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

  async function handleDelete(_id: string) {
    if (window.confirm(`Are you sure to delete ${_id}?`)) {
      await deleteUser(_id);

      const updated = [...users].filter((user) => user._id !== _id);
      setUsers(updated);

      toast.success("User has been deleted.");
    }
  }

  return (
    <>
      <Title mainText="ADMIN AREA" />
      <div style={{ paddingBottom: 500 }}>
        <h1 style={{ textAlign: "center", marginBottom: 50 }}>
          Total Users
          <span> ( {users.length} )</span>
        </h1>

          <TableContainer
            component={Paper}
            style={{ width: "75%", margin: "auto" }}
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
                      {JSON.stringify(row.isBlocked) === "true" ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="right">
                      {row.admin === true ? (
                        ""
                      ) : (
                        <Button>
                          <Link
                            style={{ display: "flex", alignItems: "center" }}
                            href={`/edituser/${row._id}`}
                          >
                            <EditIcon />
                          </Link>
                        </Button>
                      )}
                      {row.admin === true ? (
                        ""
                      ) : (
                        <Button onClick={() => handleDelete(row._id as string)}>
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
      </div>
    </>
  );
};

export default Sandbox;
