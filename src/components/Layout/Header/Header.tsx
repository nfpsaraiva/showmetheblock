import { Group, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { SearchBox } from "../../../features";

const Header: FC = () => {
  return (
    <Stack h="100%" py={"md"} align="center">
      <Title ff={"mono"} lts={4}>show me the block</Title>
      <SearchBox />
    </Stack>
  )
}

export default Header;