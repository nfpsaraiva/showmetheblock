import { FC } from "react";
import { useBlocksQuery } from "../../api/blockApi";
import { Accordion, ActionIcon, Button, Center, Group, Loader, Stack, Text } from "@mantine/core";
import { useShallow } from "zustand/react/shallow";
import useStore from "../../state/store";
import { IconArrowDown, IconArrowUp, IconCube, IconExternalLink } from "@tabler/icons-react";

const BlockList: FC = () => {
  const [
    searchTerm,
  ] = useStore(useShallow(state => [
    state.searchTerm,
  ]));

  const { data: blocks, refetch, isLoading, isError } = useBlocksQuery(searchTerm);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

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
              blocks.map(block => {
                return (
                  <Accordion.Item key={block.timestamp} value={block.number}>
                    <Accordion.Control icon={<IconCube size={20} />}>
                      <Group justify="space-between">
                        <Group>
                          <Text>
                            {formatDate(block.timestamp)}
                          </Text>
                        </Group>
                        <Group>
                          <Button leftSection={<IconArrowUp />}>{block.sents}</Button>
                          <Button leftSection={<IconArrowDown />}>{block.receives}</Button>
                          <ActionIcon variant="subtle" component="a" target="_blank" href={`https://etherscan.io/block/${block.number}`}>
                            <IconExternalLink size={14} />
                          </ActionIcon>
                        </Group>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                    </Accordion.Panel>
                  </Accordion.Item>
                )
              })
            }
          </Accordion>
        </Stack>
      }
    </Stack>
  )
}

export default BlockList;