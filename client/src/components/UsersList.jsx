import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UsersList = ({ users, onClose }) => {
  const navigate = useNavigate();
  return (
    <Box>
      {users.length > 0 ? (
        <List>
          {users.map((user) => (
            <ListItem
              key={user._id}
              onClick={() => {
                onClose && onClose();
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
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="gray" align="center" variant="subtitle1">
          No results
        </Typography>
      )}
    </Box>
  );
};

export default UsersList;
