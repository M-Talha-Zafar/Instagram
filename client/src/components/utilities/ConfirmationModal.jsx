import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";

const ConfirmationModal = ({
  open,
  handleClose,
  handleDelete,
  entityTitle,
  deleting,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete {entityTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this
          {` ${entityTitle.charAt(0).toLowerCase() + entityTitle.slice(1)}`}?
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        {deleting ? (
          <CircularProgress />
        ) : (
          <Button onClick={handleDelete} color="primary" variant="contained">
            Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
