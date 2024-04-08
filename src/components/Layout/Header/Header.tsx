import { ActionIcon, Group, Stack, Title } from "@mantine/core";
import { FC } from "react";
import { ColorThemeSwitcher, SearchBox } from "../../../features";
import { IconReload } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";

const Header: FC = () => {
  const queryClient = useQueryClient();

  return (
    <Group h="100%" px={"md"} justify="space-between">
      <SearchBox />
      <Group>
        <ActionIcon variant="subtle" size={"lg"}>
          <IconReload size={22} />
        </ActionIcon>
        <ColorThemeSwitcher />
      </Group>
    </Group>
  )
}

export default Header;