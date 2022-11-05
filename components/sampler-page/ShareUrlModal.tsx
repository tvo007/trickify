import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import React, { ReactNode, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CurrentSceneUrl from "./CurrentSceneUrl";
import { siteUrl } from "../../lib/api";
import { ICurrentScene } from "../../lib/interfaces";
import { generateUrl } from "../../lib/helpers";

interface ShareUrlModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
  samplerId: string;
  currentScene: ICurrentScene;
  url: string;
}

const ShareUrlModal = ({
  isModalOpen,
  handleModalClose,
  samplerId,
  currentScene,
  url,
}: ShareUrlModalProps) => {
  const trickifyUrl = `${siteUrl}/${samplerId}?start=${currentScene.timestamp}`;
  const youtubeUrl = generateUrl(url, currentScene.timestamp);
  function showSharableUrl(step) {
    switch (step) {
      case 0:
        return <CurrentSceneUrl url={trickifyUrl} />;
      case 1:
        return <CurrentSceneUrl url={youtubeUrl} />;
      default:
        return <CurrentSceneUrl url={trickifyUrl} />;
    }
  }
  const [urlOption, setUrlOption] = useState(0);
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
      <DialogContent>
        {showSharableUrl(urlOption)}
        <Stack sx={{ width: "50%" }} direction="row">
          <Button
            onClick={() => setUrlOption(0)}
            sx={urlOption !== 0 ? { color: "#6F6F6F" } : {}}
          >
            trickify
          </Button>
          <Button
            onClick={() => setUrlOption(1)}
            sx={urlOption !== 1 ? { color: "#6F6F6F" } : {}}
          >
            youtube
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ShareUrlModal;
