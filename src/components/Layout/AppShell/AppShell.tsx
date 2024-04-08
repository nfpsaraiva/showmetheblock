import { AppShell as MantineAppShell } from "@mantine/core";
import { FC } from "react";
import Footer from "../Footer/Footer";
import ScrollToTop from "../../../features/ScrollToTop/ScrollToTop";
import Main from "../Main/Main";
import Header from "../Header/Header";
import { useHeadroom } from "@mantine/hooks";

const AppShell: FC = () => {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <MantineAppShell
      header={{ height: 60}}
      footer={{ height: 60 }}
      padding="md"
    >
      <MantineAppShell.Header withBorder={false} >
        <Header />
      </MantineAppShell.Header>
      <MantineAppShell.Main>
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