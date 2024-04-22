import { ActionIcon, Collapse, Group, Stack } from "@mantine/core";
import { FC } from "react";
import { Logo, SearchBox } from "../../../features";
import { IconAdjustmentsHorizontal, IconSearch, IconSettings } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const Header: FC = () => {
  const [searchOpened, searchHandle] = useDisclosure(false);
  const [adjustmentsOpened, adjustmentsHandle] = useDisclosure(false);
  const [settingsOpened, settingsHandle] = useDisclosure(false);

  return (
    <Stack align="center" h={"100%"} py={"md"}>
      <Logo />
      <Group>
        <ActionIcon size={"lg"} variant={searchOpened ? 'filled': 'subtle'} onClick={searchHandle.toggle}>
          <IconSearch size={18} />
        </ActionIcon>
        <ActionIcon size={"lg"} variant={adjustmentsOpened ? 'filled': 'subtle'} onClick={adjustmentsHandle.toggle}>
          <IconAdjustmentsHorizontal size={18} />
        </ActionIcon>
        <ActionIcon size={"lg"} variant={settingsOpened ? 'filled': 'subtle'} onClick={settingsHandle.toggle}>
          <IconSettings size={18} />
        </ActionIcon>
      </Group>

      <Collapse in={searchOpened}>
        <SearchBox />
      </Collapse>
    </Stack>
  )
}

export default Header;