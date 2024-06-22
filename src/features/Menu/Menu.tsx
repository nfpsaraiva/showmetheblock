import { Burger, Collapse, Group, Stack } from "@mantine/core";
import { FC } from "react";
import ColorThemeSwitcher from "./ColorThemeSwitcher/ColorThemeSwitcher";
import { useDisclosure } from "@mantine/hooks";
import AboutButton from "./About/AboutButton";

const Menu: FC = () => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Group justify='space-between' wrap="nowrap">
        <Burger onClick={toggle} color='blue.5' size={"sm"} />
        <ColorThemeSwitcher />
      </Group>
      <Collapse in={opened}>
        <Stack gap={"xs"}>
          <AboutButton />
        </Stack>
      </Collapse>
    </>
  )
}

export default Menu;