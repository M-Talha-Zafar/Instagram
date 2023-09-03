import { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import UsersList from "../components/users/UsersList";
import { userService } from "../services/userService";

const Search = () => {
  const { searchUsers, searching } = userService();

  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchQueryResults = async () => {
    if (searchQuery.trim() === "") {
      setUsers([]);
      return;
    }

    try {
      const users = await searchUsers(searchQuery);
      setUsers(users);
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
      <Box
        sx={{ p: 5, display: "flex", justifyContent: "center", width: "100%" }}
      >
        {searching ? (
          <CircularProgress />
        ) : users.length === 0 ? (
          <Typography align="center" variant="h6">
            No results
          </Typography>
        ) : (
          <Box sx={{ height: "60vh", overflowY: "auto", width: "100%" }}>
            <UsersList users={users} />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Search;
