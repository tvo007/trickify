import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import React, { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ShareUrlModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
  children: ReactNode;
}

const ShareUrlModal = ({
  isModalOpen,
  handleModalClose,
  children,
}: ShareUrlModalProps) => {
  return (
    <Dialog
      open={isModalOpen}
      onClose={handleModalClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Stack
          direction={"row"}
          justifyContent="space-between"
          sx={{ pr: "2px" }}
        >
          <Typography component={Box} fontWeight={500}>
            Share
          </Typography>
          <IconButton size="small" onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default ShareUrlModal;
