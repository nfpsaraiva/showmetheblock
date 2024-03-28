import { ActionIcon, AppShell, Card, Group, Loader, NumberInput, Stack, Text, TextInput, Title, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import ColorThemeSwitcher from "../components/ColorThemeSwitcher/ColorThemeSwitcher";
import { IconArrowLeft, IconArrowRight, IconCube } from '@tabler/icons-react';
import { useBlockQuery, useBlocksQuery, useLastBlockNumberQuery } from "../api/blockApi";
import BlockAddress from "../features/BlockAddress/BlockAddress";
import { useDisclosure } from "@mantine/hooks";

export function HomePage() {
  const [blockNumber, setBlockNumber] = useState<string>('');
  const { data: lastBlockNumber } = useLastBlockNumberQuery();
  const {data: blocks, isLoading} = useBlocksQuery([1,2,3]);

  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }} padding="md">
      <AppShell.Header withBorder={false}>
        <Group justify="space-between" h="100%" px="md">
          <ActionIcon component="a" href="/" variant="transparent">
            <IconCube size={30} />
          </ActionIcon>
          <ColorThemeSwitcher />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Stack gap={"xl"} align="center">
          <Stack justify="center" align="center">
            <Title ff={"mono"} lts={10}>show me the block</Title>
            <Group justify="center">
              <TextInput
                placeholder="Enter a numer"
                rightSection={<></>}
                variant="unstyled"
                autoFocus
                size="xl"
                prefix="#"
                w={"auto"}
                value={blockNumber}
                onChange={e => setBlockNumber(e.target.value)}
              />
            </Group>
          </Stack>
          {
            isLoading && <Loader />
          }
          {
            blocks &&
            blocks.map(block => {
              return (
                <Card withBorder radius={"lg"} shadow="md">
                  <Card.Section inheritPadding py={"md"} withBorder>
                    <Group justify="space-between">
                      <Title order={3}>Block #{block.number}</Title>
                      <BlockAddress number={block.number} label="View in explorer" />
                    </Group>
                  </Card.Section>
                  <Stack my={"xl"}>
                    <Group justify="space-between">
                      <Text>Miner</Text>
                    </Group>
                  </Stack>
                </Card>
              )
            })
          }
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
