import { Button, Center, Group, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { SearchBox } from "../../../features";
import { useQueryClient } from "@tanstack/react-query";

const Header: FC = () => {
  const queryClient = useQueryClient();

  const refresh = () => {
    queryClient.invalidateQueries({queryKey: ["blocks"]});
  }

  return (
    <Group justify="center" h="100%">
      <Stack gap={"xl"}>
        <Center>
          <Title size={24} ff={"mono"} lts={15}>show me the block</Title>
        </Center>
        <SearchBox />
        <Group>
          <Button onClick={refresh}>Refresh</Button>
        </Group>
      </Stack>
    </Group>
  )
}

export default Header;