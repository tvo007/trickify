import { useState, VFC } from "react";
import { ICurrentScene, IScene } from "../../lib/interfaces";
import {
  Stack,
  Typography,
  Box,
  Card,
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { secondsToTime, generateUrl } from "../../lib/helpers";
import { useRouter } from "next/router";
import { siteUrl } from "../../lib/api";
import CurrentSceneUrl from "./CurrentSceneUrl";
import CurrentSceneControls from "./CurrentSceneControls";
import CurrentSceneOptions from "./CurrentSceneOptions";
import ShareUrlModal from "./ShareUrlModal";
import { getSceneByIndex } from "../../lib/hooks/useScenes";
import ScenesModal from "./ScenesModal";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LoopIcon from "@mui/icons-material/Loop";

interface CurrentSceneProps {
  scenes: IScene[];
  currentScene?: ICurrentScene;
  url: string;
  handlePlayer: () => void;
  handleOnPause: () => void;
  handleLooperToggle: () => void;
  isPlaying: boolean;
  isLooping: boolean;
  handleNext: () => void;
  handlePrev: () => void;
  handleRestart: () => void;
  handleCurrentScene: (scene: ICurrentScene) => void;
}

const CurrentScene: VFC<CurrentSceneProps> = ({
  currentScene,
  url,
  handlePlayer,
  isPlaying,
  handleOnPause,
  isLooping,
  handleLooperToggle,
  handleNext,
  handlePrev,
  handleRestart,
  handleCurrentScene,
  scenes,
}) => {
  const router = useRouter();
  const {
    // start: startParam,
    // play: playParam,
    // loop: loopParam,
    id: samplerId,
  } = router.query;

  //example param: ...?start=11&play=true&loop=true

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(0);

  const handleShareModalOpen = () => {
    handleOnPause();
    setActiveModal(0);
    setIsModalOpen(true);
  };

  const handleScenesModalOpen = () => {
    handleOnPause();
    setActiveModal(1);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  function selectModal(option) {
    switch (option) {
      case 0:
        return (
          <ShareUrlModal
            isModalOpen={isModalOpen}
            handleModalClose={handleModalClose}
            samplerId={samplerId as string}
            currentScene={currentScene}
            url={url}
          />
        );
      case 1:
        return (
          <ScenesModal
            scenes={scenes}
            isModalOpen={isModalOpen}
            handlePlayer={handlePlayer}
            handleModalClose={handleModalClose}
            handleCurrentScene={handleCurrentScene}
          />
        );
      default:
        return (
          <ShareUrlModal
            isModalOpen={isModalOpen}
            handleModalClose={handleModalClose}
            samplerId={samplerId as string}
            currentScene={currentScene}
            url={url}
          />
        );
    }
  }
  const theme = useTheme();
  const matchesMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // console.log(currentScene);

  return (
    <>
      {selectModal(activeModal)}
      <Stack sx={{ pb: "1rem" }}>
        <Card
          sx={{
            p: "1rem",
            justifyContent: "flex-start",
            height: "14rem",
            maxWidth: { xs: "85vw", md: "93vw" },
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "",
              height: "100%",
            }}
          >
            <Stack
              direction={"row"}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Stack direction={"row"} alignItems="center">
                <Typography
                  component={Box}
                  color={"black"}
                  variant={matchesMdUp ? "body1" : "body2"}
                  fontWeight={600}
                  align="left"
                  sx={{ pr: "4px" }}
                >
                  <PersonOutlineIcon fontSize="medium" />{" "}
                </Typography>
                <Typography
                  component={Box}
                  color={"black"}
                  variant={"body1"}
                  fontWeight={600}
                  align="left"
                  sx={{ pb: "4px" }}
                >
                  {currentScene.performed_by
                    ? `${currentScene.performed_by}`
                    : "---"}
                </Typography>
              </Stack>
              <Box>
                <IconButton
                  size="small"
                  onClick={() => handleLooperToggle()}
                  sx={
                    isLooping ? { color: "primary.main" } : { color: "#6B7280" }
                  }
                >
                  <LoopIcon />
                </IconButton>
              </Box>
            </Stack>
            <Typography
              component={Box}
              color={"black"}
              variant={matchesMdUp ? "body1" : "body2"}
              fontWeight={500}
              align="center"
            >
              {currentScene.tricks ? `${currentScene.tricks}` : "---"}
            </Typography>

            <Box>
              <CurrentSceneControls
                handlePlayer={handlePlayer}
                isPlaying={isPlaying}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
              <CurrentSceneOptions
                handleShareModalOpen={handleShareModalOpen}
                handleScenesModalOpen={handleScenesModalOpen}
                handleLooperToggle={handleLooperToggle}
                isLooping={isLooping}
                handleRestart={handleRestart}
              />
            </Box>
          </Stack>
        </Card>
      </Stack>
    </>
  );
};

export default CurrentScene;
