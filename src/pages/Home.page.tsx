import { Box, Card, Center, Stack } from "@mantine/core";
import Header from "../features/Header/Header";
import Menu from "../features/Menu/Menu";
import { BlockList, SearchBox } from "../features";

export function HomePage() {
  return (
    <Center my={"xl"} mx={"sm"}>
      <Card radius={"lg"} shadow='lg' padding={"lg"} withBorder>
        <Card.Section py={"md"} inheritPadding withBorder>
          <Stack gap={"lg"}>
            <Header />
            <SearchBox />
            <Menu />
          </Stack>
        </Card.Section>
        <Box my={"xl"}>
          <Center>
            <BlockList />
          </Center>
        </Box>
      </Card>
    </Center>
  );
}
