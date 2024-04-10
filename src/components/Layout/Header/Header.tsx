import { Button, Group, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { SearchBox } from "../../../features";

const Header: FC = () => {
  return (
    <Stack align="center" justify="space-between" h={"100%"} py={"md"}>
      <Title size={"h2"} lts={6}>show me the blocks</Title>
      <SearchBox />
      <Group justify="space-between">
        <Button size="xs">Fetch new blocks</Button>
        <Button size="xs">Clear</Button>
      </Group>
    </Stack>
  )
}

export default Header;