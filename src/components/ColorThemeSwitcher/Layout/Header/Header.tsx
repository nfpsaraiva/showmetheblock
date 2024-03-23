import { ActionIcon, Group } from "@mantine/core";
import { IconCube } from "@tabler/icons-react";
import { FC } from "react";
import ColorThemeSwitcher from "../../ColorThemeSwitcher";

const Header: FC = () => {
    return (
        <Group justify="space-between" h="100%" px="md">
          <ActionIcon component="a" href="/" variant="transparent">
            <IconCube size={30} />
          </ActionIcon>
          <ColorThemeSwitcher />
        </Group>
    )
}

export default Header;