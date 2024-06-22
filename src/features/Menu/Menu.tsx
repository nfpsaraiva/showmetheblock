import { Burger, Group } from "@mantine/core";
import { FC } from "react";
import ColorThemeSwitcher from "./ColorThemeSwitcher/ColorThemeSwitcher";

const Menu: FC = () => {

  return (
    <>
      <Group justify='space-between' wrap="nowrap">
        <Burger color='blue.5' size={"sm"} />
        <ColorThemeSwitcher />
      </Group >
    </>
  )
}

export default Menu;