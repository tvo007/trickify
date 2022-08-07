import { VFC } from "react";
import { ICurrentScene } from "../../lib/interfaces";
import {
  Stack,
  Typography,
  Box,
  Card,
  Button,
  CardActionArea,
} from "@mui/material";
import { secondsToTime } from "../../lib/helpers";

interface CurrentSceneProps {
  currentScene?: ICurrentScene;
}

const CurrentScene: VFC<CurrentSceneProps> = ({ currentScene }) => {
  if (currentScene) {
    return (
      <Stack sx={{ pb: "1rem" }}>
        <Card
          sx={{
            p: "1rem",
            width: "95%",
            justifyContent: "flex-start",
            minHeight: "7rem",
          }}
        >
          <CardActionArea>
            <Typography
              component={Box}
              color={"#6F6F6F"}
              variant="body2"
              fontWeight={500}
              align="left"
            >
              {secondsToTime(currentScene.timestamp)} - {currentScene.tricks}
            </Typography>
          </CardActionArea>
        </Card>
      </Stack>
    );
  } else {
    return (
      <Stack sx={{ pb: "1rem" }}>
        <Card
          sx={{
            p: "1rem",
            width: "95%",
            justifyContent: "flex-start",
            minHeight: "7rem",
          }}
        >
          <Typography
            component={Box}
            color={"#6F6F6F"}
            variant="body2"
            fontWeight={500}
            align="left"
          >
            Scene not selected.
          </Typography>
        </Card>
      </Stack>
    );
  }
};

export default CurrentScene;
