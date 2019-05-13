import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@material-ui/core';

interface IProps {
  open: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

class DeleteConfirmModal extends React.Component<IProps> {
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onCancel}>
        <DialogTitle>Delete Invoice</DialogTitle>
        <DialogContent style={{ minWidth: 600 }}>
          <DialogContentText>
            Do you really want to delete this invoice?
        </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.props.onCancel}>
            Cancel
          </Button>
          <div style={{ flex: 1 }} />
          <Button color="secondary" variant="contained" onClick={this.props.onDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeleteConfirmModal;
