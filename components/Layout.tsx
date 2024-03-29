import React, { ReactNode } from "react";
import {
  Container,
  Grid,
  Stack,
  Typography,
  Box,
  AppBar,
  Button,
  IconButton,
} from "@mui/material";
import { useAuth } from "../lib/contexts/AuthContext";
import { Fragment } from "react";
import { useRouter } from "next/router";

import SearchIcon from "@mui/icons-material/Search";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="relative"
          sx={{ backgroundColor: "white", height: "8vh" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "inherit",
            }}
          >
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{
                height: "100%",
                px: "1rem",
                width: "100%",
                maxWidth: "1200px",
              }}
            >
              <Stack direction="row" spacing={8}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => router.push("/")}
                >
                  <Typography
                    variant="h4"
                    component={Box}
                    fontWeight="bold"
                    sx={{ color: "#ff5252", fontFamily: "Permanent Marker" }}
                  >
                    Trickify
                  </Typography>
                </Box>
                <Stack direction="row" spacing={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      pt: "8px",
                    }}
                    onClick={() => router.push("/samplers")}
                  >
                    <Typography
                      variant="body2"
                      component={Box}
                      fontWeight="medium"
                      sx={{ color: "black" }}
                    >
                      SAMPLERS
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      pt: "8px",
                    }}
                    onClick={() => router.push("/faq")}
                  >
                    <Typography
                      variant="body2"
                      component={Box}
                      fontWeight="medium"
                      sx={{ color: "black" }}
                    >
                      FAQ
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              <Stack direction="row">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => router.push("/search")}
                >
                  <IconButton sx={{ color: "primary.main" }}>
                    <SearchIcon />
                  </IconButton>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </AppBar>
      </Box>
      <Container maxWidth="lg">
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justifyContent={"flex-start"}
          sx={{ minHeight: "90vh", pt: "5rem" }}
        >
          {children}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Layout;
