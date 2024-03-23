import { Group, Stack, Text } from "@mantine/core";
import { FC } from "react";
import Header from "../Header/Header";

const Main: FC = () => {
  return (
    <Stack gap={"xl"} align="center">
      <Header />
    </Stack>
  )
}

export default Main;