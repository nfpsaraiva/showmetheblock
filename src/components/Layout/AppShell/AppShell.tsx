import { Center, AppShell as MantineAppShell, Stack, Title } from "@mantine/core";
import { FC } from "react";
import Footer from "../Footer/Footer";
import ScrollToTop from "../../../features/ScrollToTop/ScrollToTop";
import { BlockList, SearchBox } from "../../../features";

const AppShell: FC = () => {
  return (
    <MantineAppShell
      footer={{ height: 60 }}
      padding="md"
    >
      <MantineAppShell.Main mx={"auto"}>

        <Center>

          <Stack>
            <Title size={75}>Show me the blocks</Title>
            <SearchBox />
            <BlockList />
          </Stack>
        </Center>

        <ScrollToTop />
      </MantineAppShell.Main>
      <MantineAppShell.Footer withBorder={false}>
        <Footer />
      </MantineAppShell.Footer>
    </MantineAppShell >
  )
}

export default AppShell;