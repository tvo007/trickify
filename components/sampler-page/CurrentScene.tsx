import { useState, VFC } from "react";
import { ICurrentScene, IScene } from "../../lib/interfaces";
import { Stack, Typography, Box, Card, Button } from "@mui/material";
import { secondsToTime, generateUrl } from "../../lib/helpers";
import { useRouter } from "next/router";
import { siteUrl } from "../../lib/api";
import CurrentSceneUrl from "./CurrentSceneUrl";
import CurrentSceneControls from "./CurrentSceneControls";
import CurrentSceneOptions from "./CurrentSceneOptions";
import ShareUrlModal from "./ShareUrlModal";
import { getSceneByIndex } from "../../lib/hooks/useScenes";
import ScenesModal from "./ScenesModal";

interface CurrentSceneProps {
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

  // console.log(currentScene);

  return (
    <>
      {selectModal(activeModal)}
      <Stack sx={{ pb: "1rem" }}>
        <Card
          sx={{
            p: "1rem",

            justifyContent: "flex-start",
            minHeight: "7rem",
          }}
        >
          <Typography
            component={Box}
            color={"black"}
            variant="body1"
            fontWeight={600}
            align="center"
          >
            {`${secondsToTime(currentScene.timestamp)} - ${
              currentScene.performed_by
            } - ${currentScene.tricks}`}
          </Typography>
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
        </Card>
      </Stack>
    </>
  );
};

export default CurrentScene;
