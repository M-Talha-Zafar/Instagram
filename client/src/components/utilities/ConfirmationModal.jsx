import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmationModal = ({
  open,
  handleClose,
  handleDelete,
  entityTitle,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete {entityTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this {entityTitle}? This action cannot
          be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
