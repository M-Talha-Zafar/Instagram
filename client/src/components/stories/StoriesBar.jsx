import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ViewStoryModal from "./ViewStoryModal";
import CreateStoryModal from "./CreateStoryModal";
import { userService } from "../../services/userService";

const StoriesBar = ({ user: currentUser }) => {
  const [users, setUsers] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [storyUser, setStoryUser] = useState({});
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { fetchStoryUsers, loadingStoryUsers } = userService();
  const navigate = useNavigate();

  const loadStoryUsers = useCallback(async () => {
    try {
      const users = await fetchStoryUsers();
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  useEffect(() => {
    loadStoryUsers();
  }, [loadStoryUsers]);

  const handleStoryClick = (user) => {
    setStoryUser(user);
    handleOpenViewModal();
  };

  const handleAddStory = () => {
    handleOpenCreateModal();
  };

  const handleOpenViewModal = () => {
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    fetchStoryUsers();
  };

  return (
    <Box sx={{ maxWidth: "40vw " }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <ViewStoryModal
          open={openViewModal}
          onClose={handleCloseViewModal}
          user={storyUser}
          update={loadStoryUsers}
        />
        <CreateStoryModal
          open={openCreateModal}
          onClose={handleCloseCreateModal}
          user={currentUser}
          update={loadStoryUsers}
        />
        <Box>
          <Avatar
            sx={{
              height: "100px",
              width: "100px",
              cursor: "pointer",
              margin: "0.5rem",
            }}
            onClick={handleAddStory}
          >
            <AddIcon />
          </Avatar>
          <Typography
            sx={{ cursor: "pointer" }}
            variant="subtitle1"
            align="center"
          >
            Add a story
          </Typography>
        </Box>
        {loadingStoryUsers ? (
          <Box>
            <CircularProgress sx={{ m: 2 }} />
          </Box>
        ) : (
          users
            .filter((user) => user?.stories.length > 0)
            .map((user) => (
              <Box key={user._id}>
                <Avatar
                  src={user.profilePicture}
                  sx={{
                    height: "100px",
                    width: "100px",
                    border: "3px solid #E1306C",
                    cursor: "pointer",
                    margin: "0.5rem",
                  }}
                  onClick={() => handleStoryClick(user)}
                />
                <Typography
                  onClick={() => {
                    navigate(`/${user.username}`);
                  }}
                  sx={{ cursor: "pointer" }}
                  variant="subtitle1"
                  align="center"
                >
                  {user.username}
                </Typography>
              </Box>
            ))
        )}
      </Box>
    </Box>
  );
};

export default StoriesBar;
