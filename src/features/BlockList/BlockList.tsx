import { FC } from "react";
import { useBlocksQuery } from "../../api/blockApi";
import { Accordion, Button, Center, Group, Loader, Stack, Text } from "@mantine/core";
import Block from "../Block/Block";
import { useShallow } from "zustand/react/shallow";
import useStore from "../../state/store";

const BlockList: FC = () => {
  const [
    searchTerm,
  ] = useStore(useShallow(state => [
    state.searchTerm,
  ]));

  const { data: blocks, refetch, isLoading, isError } = useBlocksQuery(searchTerm);

  return (
    <Stack gap={"xl"} mx={"auto"}>
      {
        isLoading && <Center><Loader /></Center>
      }
      {
        isError && <Center><Text>Something went wrong</Text></Center>
      }
      {
        blocks &&
        <Stack align="center">
          <Group>
            <Button onClick={() => refetch()}>Refresh</Button>
          </Group>
          <Text>{blocks.length} blocks</Text>
          <Accordion variant="separated" radius={"md"} chevron={null}>
            {
              blocks.map(block => <Block key={block.number} block={block} />)
            }
          </Accordion>
        </Stack>
      }
    </Stack>
  )
}

export default BlockList;