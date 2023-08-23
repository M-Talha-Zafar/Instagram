import { Box, Typography, Modal } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import UsersList from "./UsersList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

const UsersModal = ({ open, onClose, context, user }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/${context}/${user._id}`
        );

        setUsers(response.data);
        console.log(`${context}: `, response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (context) fetchUsers();
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" align="center">
          {context && context.charAt(0).toUpperCase() + context.slice(1)}
        </Typography>
        <Box
          sx={{
            mt: 5,
            height: "30vh",
            overflowX: "auto",
          }}
        >
          <UsersList users={users} onClose={onClose} />
        </Box>
      </Box>
    </Modal>
  );
};

export default UsersModal;
