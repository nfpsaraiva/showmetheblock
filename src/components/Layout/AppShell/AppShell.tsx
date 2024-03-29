import { AppShell as MantineAppShell } from "@mantine/core";
import { FC } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BlockList from "../../../features/BlockList/BlockList";

const AppShell: FC = () => {
  return (
    <MantineAppShell
      header={{ height: 150 }}
      footer={{ height: 60 }}
      padding="md"
    >
      <MantineAppShell.Header withBorder={false}>
        <Header />
      </MantineAppShell.Header>
      <MantineAppShell.Main maw={600} mx={"auto"}>
        <BlockList />
      </MantineAppShell.Main>
      <MantineAppShell.Footer withBorder={false}>
        <Footer />
      </MantineAppShell.Footer>
    </MantineAppShell >
  )
}

export default AppShell;