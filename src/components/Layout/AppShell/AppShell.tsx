import { AppShell as MantineAppShell, ScrollArea } from "@mantine/core";
import { FC } from "react";
import Footer from "../Footer/Footer";
import ScrollToTop from "../../../features/ScrollToTop/ScrollToTop";
import Main from "../Main/Main";
import Header from "../Header/Header";
import classes from "./AppShell.module.css"

const AppShell: FC = () => {
  return (
    <MantineAppShell
      layout="alt"
      header={{ height: 140 }}
      footer={{ height: 60 }}
      padding="md"
    >
      <MantineAppShell.Header withBorder={false} >
        <Header />
      </MantineAppShell.Header>
      <MantineAppShell.Main component={ScrollArea} className={classes.main}>
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