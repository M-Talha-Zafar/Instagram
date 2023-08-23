import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UsersList from "../components/UsersList";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchQueryResults = async () => {
    if (searchQuery === "") {
      setUsers([]);
      return;
    }
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/users/search?searchQuery=${searchQuery}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQueryResults();
  }, [searchQuery]);

  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Box mt={5} p={3}>
          <Typography variant="h4" mb={3}>
            Search
          </Typography>
          <TextField
            type="text"
            name="search-query"
            fullWidth
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {searchQuery && (
                    <IconButton edge="end" onClick={handleClearSearch}>
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Paper>
      <Box m={5}>
        {users.length === 0 ? (
          <Typography align="center" variant="h6">
            No results
          </Typography>
        ) : (
          <UsersList users={users} />
        )}
      </Box>
    </Container>
  );
};

export default Search;
