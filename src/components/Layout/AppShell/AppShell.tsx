import { AppShell as MantineAppShell } from "@mantine/core";
import { FC } from "react";
import Footer from "../Footer/Footer";
import ScrollToTop from "../../../features/ScrollToTop/ScrollToTop";
import Main from "../Main/Main";
import Header from "../Header/Header";
import { useDisclosure } from "@mantine/hooks";
import classes from "./AppShell.module.css";
import NavbarHeader from "../NavbarHeader/NavbarHeader";

const AppShell: FC = () => {
  const [navbarMobileOpened, navbarMobileHandle] = useDisclosure(false);
  const [navbarDesktopOpened, navbarDesktopHandle] = useDisclosure(true);

  return (
    <MantineAppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: { base: 350 },
        breakpoint: 'sm',
        collapsed: { mobile: !navbarMobileOpened, desktop: !navbarDesktopOpened },
      }}
      padding="md"
    >
      <MantineAppShell.Header withBorder={false} >
        <Header />
      </MantineAppShell.Header>
      <MantineAppShell.Navbar withBorder={false} p="md" className={classes.navbar}>
        <MantineAppShell.Section>
          <NavbarHeader />
        </MantineAppShell.Section>

        <MantineAppShell.Section grow>
        </MantineAppShell.Section>
      </MantineAppShell.Navbar>
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