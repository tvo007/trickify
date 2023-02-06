import {
  Stack,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import Typography from "@mui/material/Typography";

const FAQ = () => {
  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{ py: "2rem", minHeight: "90vh" }}
    >
      <Stack direction={"column"} spacing={4}>
        <Stack direction={"column"} spacing={2}>
          <Typography component={Box} variant={"h6"}>
            What is Tricking?
          </Typography>
          <Typography component={Box} variant="body2">
            Tricking, a discipline that merges the physicality of martial arts
            with the acrobatics of gymnastics and the fluidity of breakdancing,
            is a high-energy performance art. It is a fusion of kicks from
            martial arts, flips and twists from gymnastics, and ground moves
            from breakdancing, all seamlessly blended together to create
            visually stunning combinations. The result is a dynamic and
            mesmerizing display of athleticism and creativity. It is a
            revolutionary discipline that defies the limits of the human body,
            constantly pushing the boundaries of what is thought possible.
          </Typography>
          <Typography component={Box} variant="body2">
            Tricking has its roots in the early 1990s, when martial artists
            began experimenting with new ways to add flair to their forms. But
            over the past few decades, tricking has evolved into something much
            more than just an extreme martial art. Today, it is a vibrant,
            living and breathing form of movement art that continues to evolve
            and inspire new generations of practitioners.
          </Typography>
        </Stack>

        <Stack direction={"column"} spacing={2}>
          <Typography component={Box} variant={"h6"}>
            What are Tricks?
          </Typography>
          <Typography component={Box} variant="body2">
            Tricks are a singular unit of movement in tricking. They can be
            performed by itself or in combinations. A whole host of interesting
            terminologies, interactions, and ideas comes into play, however,
            when exploring these movements in sequence as there are many
            different kinds of transitions from trick to trick that can redefine
            the aesthetic of the sequence.
          </Typography>
        </Stack>

        <Stack direction={"column"} spacing={2}>
          <Typography component={Box} variant={"h6"}>
            What are Samplers?
          </Typography>
          <Typography component={Box} variant={"body2"}>
            Samplers are one of the foundational video/visual based mediums for
            trickers to share their progress and journey in this discipline.
            Samplers also serve as historical snapshots for the discipline in
            terms what is possible in terms of human ingenuity, creativity, and
            athleticism. Naturally, samplers also act as a source of inspiration
            and learning for the discipline. Which leads us to...
          </Typography>
        </Stack>

        <Stack direction={"column"} spacing={2}>
          <Typography component={Box} variant={"h6"}>
            What is Trickify?
          </Typography>
          <Typography component={Box} variant={"body2"}>
            Trickify is an app that helps users to explore tricking through the
            lens of a sampler. Each sampler is split up into scenes with each
            scene containing a set of tricks and video timestamp/endstamp
            values. This allows users to view and analyze sampler scenes in real
            time as the video progresses. As more samplers, scenes, and tricks
            are added, users will then be able to use this ever expanding tricks
            dataset for use in their own progressions and tricking ideas.
          </Typography>
        </Stack>
      </Stack>
      {/* <Stack direction={"column"}>
        <Box>
          What are <q>tricks</q>?
        </Box>
        <Box>
          Tricks are a singular unit of movement in tricking. They can be
          performed by itself or in combinations. A whole host of interesting
          terminologies, interactions, and ideas comes into play, however, when
          exploring these movements in sequence as there are many different
          kinds of transitions from trick to trick that can redefine the
          aesthetic of the sequence.
        </Box>
      </Stack>
      <Stack direction={"column"}>
        <Box>
          What are <q>samplers</q>?
        </Box>
        <Box>
          Samplers are one of the foundational video/visual based mediums for
          trickers to share their progress and journey in this discipline.
          Samplers also serve as historical snapshots for the discipline in
          terms what is possible in terms of human ingenuity, creativity, and
          athleticism. Naturally, samplers also act as a source of inspiration
          and learning for the discipline. Which leads us to...
        </Box>
      </Stack>
      <Stack direction={"column"}>
        <Box>What is Trickify?</Box>
        <Box>
          Trickify is an app that helps users to explore tricking through the
          lens of a sampler. Each sampler is split up into scenes with each
          scene containing a set of tricks and video timestamp/endstamp values.
          This allows users to view and analyze sampler scenes in real time as
          the video progresses. As more samplers, scenes, and tricks are added,
          users will then be able to use this ever expanding tricks dataset for
          use in their own progressions and tricking ideas.
        </Box>
      </Stack> */}
    </Stack>
  );
};

export default FAQ;
