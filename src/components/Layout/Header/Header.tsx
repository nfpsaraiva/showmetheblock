import { ActionIcon, Group } from "@mantine/core";
import { FC } from "react";
import { ColorThemeSwitcher, SearchBox } from "../../../features";
import { IconReload } from "@tabler/icons-react";

const Header: FC = () => {
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