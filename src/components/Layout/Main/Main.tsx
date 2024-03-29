import { Stack } from "@mantine/core";
import { FC } from "react";
import BlockList from "../../../features/BlockList/BlockList";

const Main: FC = () => {
  return (
    <Stack gap={"xl"} align="center">
      <BlockList />
    </Stack>
  )
}

export default Main;