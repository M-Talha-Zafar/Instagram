import { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const DropdownMenu = ({ onDelete, onEdit }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        aria-label="more"
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box>
          <MenuItem onClick={onEdit}>
            <EditIcon sx={{ marginRight: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={onDelete}>
            <DeleteIcon sx={{ marginRight: 1 }} />
            Delete
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  );
};

export default DropdownMenu;
