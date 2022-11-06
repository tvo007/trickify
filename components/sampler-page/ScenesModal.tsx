import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  Box,
  IconButton,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ICurrentScene, IScene } from "../../lib/interfaces";
import Scrollbars from "react-custom-scrollbars-2";
import SamplerSceneCard from "../SamplerSceneCard";
// import useScenes from "../../lib/hooks/useScenes";
import { useRouter } from "next/router";

interface ScenesModalProps {
  scenes: IScene[];
  isModalOpen: boolean;
  handleModalClose: () => void;
  handlePlayer: () => void;
  handleCurrentScene: (scene: ICurrentScene) => void;
}

const initialSearchState = "";

const ScenesModal = ({
  isModalOpen,
  handleModalClose,
  handlePlayer,
  handleCurrentScene,
  scenes,
}: ScenesModalProps) => {
  const router = useRouter();
  // const { id } = router.query;
  // const samplerId = id.toString();
  // const { data: scenes, error, isSuccess } = useScenes(samplerId);

  const [sortState, setSortState] = useState<number>(0);
  function selectSort(option: number) {
    switch (option) {
      case 0:
        //desc
        return (a, b) => (a.timestamp < b.timestamp ? 1 : -1);
      case 1:
        //asc
        return (a, b) => (a.timestamp > b.timestamp ? 1 : -1);
      default:
        //desc
        return (a, b) => (a.timestamp < b.timestamp ? 1 : -1);
    }
  }

  const [searchInput, setSearchInput] = useState(initialSearchState);
  const [filteredResults, setFilteredResults] = useState([]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = scenes?.filter((item) => {
        return Object.values(item.tricks)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(scenes);
    }
  };

  // console.log(scenes);
  return (
    <Dialog
      open={isModalOpen}
      onClose={handleModalClose}
      maxWidth="sm"
      fullWidth
      sx={{}}
    >
      <DialogTitle>
        <Stack
          direction={"row"}
          justifyContent="space-between"
          sx={{ pr: "2px" }}
        >
          <Typography component={Box} fontWeight={500}>
            Scenes
          </Typography>
          <IconButton size="small" onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack direction={"column"} spacing={2} sx={{}}>
          <Stack sx={{}} spacing={1}>
            <Box>
              <TextField
                size="small"
                fullWidth
                onChange={(e) => searchItems(e.target.value)}
              />
            </Box>
            <Stack direction={"row"}>
              <Button onClick={() => setSortState(0)}>DSC</Button>
              <Button onClick={() => setSortState(1)}>ASC</Button>
            </Stack>
            {/* <Stack sx={{ pl: "8px" }}>
              {filteredResults.length} scenes{" "}
              {searchInput !== "" && `containing ${searchInput}`}
            </Stack> */}
          </Stack>
          <Grid item>
            {/* {error && <h2>Something went wrong.</h2>} */}
            {scenes.length === 0 && (
              <h2>There are currently no scenes assigned to this sampler.</h2>
            )}
            {scenes.length > 0 && (
              <Scrollbars autoHeight autoHeightMin={300}>
                <Stack direction="column" spacing={2}>
                  {searchInput.length > 1
                    ? filteredResults
                        .sort(selectSort(sortState))
                        .map((scene) => (
                          <SamplerSceneCard
                            key={scene.id}
                            scene={scene}
                            handlePlayer={handlePlayer}
                            handleCurrentScene={handleCurrentScene}
                            handleModalClose={handleModalClose}
                          />
                        ))
                    : scenes
                        .sort(selectSort(sortState))
                        .map((scene) => (
                          <SamplerSceneCard
                            key={scene.id}
                            scene={scene}
                            handlePlayer={handlePlayer}
                            handleCurrentScene={handleCurrentScene}
                            handleModalClose={handleModalClose}
                          />
                        ))}
                </Stack>
              </Scrollbars>
            )}
          </Grid>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ScenesModal;
