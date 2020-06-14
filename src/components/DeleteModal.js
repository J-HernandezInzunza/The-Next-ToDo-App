import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = ({ showModal, selectedItem, toggleModal, onTodoDelete }) => {
  return (
    <>
      <Dialog open={showModal} onClose={() => toggleModal()}>
        <DialogTitle>Do you wish to delete this Item?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Delete the todo with text: "${selectedItem ? selectedItem.text : ''}"`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleModal()} color="primary">
            Keep It
          </Button>
          <Button onClick={() => onTodoDelete(selectedItem)} color="secondary" autoFocus>
            Trash It
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlertDialog;
