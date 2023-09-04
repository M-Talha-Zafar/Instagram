import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useUserContext } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../contexts/SnackbarContext";
import axios from "axios";
import { userService } from "../services/userService";

const Requests = () => {
  const { user } = useUserContext();
  const { showSnackbar } = useSnackbar();
  const { getRequests, loadingRequests } = userService();

  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requests = await getRequests();
        setRequests(requests);
      } catch (ex) {
        console.error(ex);
      }
    };

    fetchRequests();
  }, []);

  const handleAcceptRequest = async (friendId) => {
    const userId = user._id;
    try {
      const token = localStorage.getItem("user-token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/accept-follow-request`,
        { userId, friendId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const updatedRequests = requests.filter((user) => user._id !== friendId);
      setRequests(updatedRequests);
      showSnackbar("Follow request accepted.");
    } catch (error) {
      console.error("Error accepting follow request:", error);
      showSnackbar("Error accepting follow request", "error");
    }
  };

  const handleRemoveRequest = async (userId) => {
    const unfollowId = user._id;
    try {
      const token = localStorage.getItem("user-token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/delete-follow-request`,
        { userId, unfollowId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const updatedRequests = requests.filter((user) => user._id !== userId);
      setRequests(updatedRequests);
      showSnackbar("Follow request removed.");
    } catch (error) {
      console.error("Error removing follow request:", error);
      showSnackbar("Error removing follow request", "error");
    }
  };

  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
      {loadingRequests ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "500px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : requests.length > 0 ? (
        <Box>
          <Typography m={5} variant="h3" align="center">
            Requests
          </Typography>
          <List>
            {requests.map((user) => (
              <ListItem
                key={user._id}
                onClick={() => {
                  navigate(`/${user.username}`);
                }}
                sx={{
                  backgroundColor: "#F2F2F2",
                  borderRadius: "10px",
                  mb: 3,
                  cursor: "pointer",
                }}
              >
                <ListItemAvatar>
                  <Avatar src={user.profilePicture} />
                </ListItemAvatar>
                <ListItemText primary={user.username} />
                <Box ml="auto">
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAcceptRequest(user._id);
                    }}
                    aria-label="Accept Request"
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRemoveRequest(user._id);
                    }}
                    aria-label="Remove Request"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Box textAlign="center" mt={5}>
          <DisabledByDefaultIcon
            sx={{ height: "5rem", width: "5rem", mb: 2 }}
          />
          <Typography variant="h3" mb={2}>
            You have no pending requests
          </Typography>
          <Typography variant="subtitle1">
            Once someone requests to follow you, it&apos;ll show up here.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Requests;
