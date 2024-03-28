import { ActionIcon, AppShell, Center, Group, Loader, Popover, Stack, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import ColorThemeSwitcher from "../components/ColorThemeSwitcher/ColorThemeSwitcher";
import { IconCube } from '@tabler/icons-react';
import { useBlocksQuery, useLastBlockNumberQuery } from "../api/blockApi";

export function HomePage() {
  const [blockNumber, setBlockNumber] = useState<string>('');
  const { data: lastBlockNumber } = useLastBlockNumberQuery();
  const { data: blocks, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useBlocksQuery(lastBlockNumber || 0);

  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }} padding="md">
      <AppShell.Header withBorder={false}>
        <Group justify="space-between" h="100%" px="md">
          <Group>
            <Title size={"xl"} ff={"mono"} lts={6}>show me the block</Title>
            <TextInput
              placeholder="Search"
              rightSection={<></>}
              autoFocus
              size="md"
              prefix="#"
              w={"auto"}
              value={blockNumber}
              onChange={e => setBlockNumber(e.target.value)}
            />
          </Group>
          <ColorThemeSwitcher />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Stack gap={"xl"} align="center">
          <Stack justify="center" align="center">

            <Group justify="center">

            </Group>
          </Stack>
          {
            isLoading && <Loader />
          }
          {
            blocks &&
            blocks.pages.map(page => {
              return page.map(block => {
                return (
                  <Popover position="right">
                    <Popover.Target>
                      <Stack my={"lg"}>
                        <ActionIcon variant="subtle" size={100}>
                          <IconCube size={50} />
                        </ActionIcon>
                        <Center>
                          <Text size="xs">{block.number}</Text>
                        </Center>
                      </Stack>
                    </Popover.Target>
                    <Popover.Dropdown>
                      {block.hash}
                    </Popover.Dropdown>
                  </Popover>
                )
              })
            })
          }
          <div>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                  ? 'Load More'
                  : 'Nothing more to load'}
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </Stack>
      </AppShell.Main>
      <AppShell.Footer withBorder={false}>
        <Group h={"100%"} justify="center">
          <Text size="sm">2024 nfpsaraiva</Text>
        </Group>
      </AppShell.Footer>
    </AppShell >
  );
}
