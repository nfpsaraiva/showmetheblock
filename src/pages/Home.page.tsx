import { Box, Card, Center, Stack } from "@mantine/core";
import { BlockList, Header, Menu, SearchBox } from "../features";

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
