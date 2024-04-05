import { AppShell as MantineAppShell } from "@mantine/core";
import { FC } from "react";
import Footer from "../Footer/Footer";
import ScrollToTop from "../../../features/ScrollToTop/ScrollToTop";
import Main from "../Main/Main";

const AppShell: FC = () => {
  return (
    <MantineAppShell
      footer={{ height: 60 }}
      padding="md"
    >
      <MantineAppShell.Main mx={"auto"}>
        <Main />
        <ScrollToTop />
      </MantineAppShell.Main>
      <MantineAppShell.Footer withBorder={false}>
        <Footer />
      </MantineAppShell.Footer>
    </MantineAppShell >
  )
}

export default AppShell;