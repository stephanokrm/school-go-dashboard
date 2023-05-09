import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

interface DestroyButtonProps {
  onDestroy: () => Promise<unknown>;
}

export const DestroyButton: FC<DestroyButtonProps> = ({ onDestroy }) => {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  const handleDestroy = async () => {
    await onDestroy();

    onClose();
  };

  return (
    <>
      <IconButton edge="end" aria-label="destroy" onClick={() => setOpen(true)}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          Você tem certeza que deseja excluir este registro?
        </DialogTitle>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleDestroy} autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
