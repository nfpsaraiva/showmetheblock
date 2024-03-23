import { Accordion, ActionIcon, Anchor, AppShell, Button, Card, Collapse, Group, Loader, NumberInput, Stack, Text, Title } from "@mantine/core";
import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import ColorThemeSwitcher from "../components/ColorThemeSwitcher/ColorThemeSwitcher";
import { IconArrowLeft, IconArrowRight, IconCube, IconExternalLink } from '@tabler/icons-react';
import { useBlockQuery } from "../api/blockApi";
import ExplorerItem from "../features/BlockAddress/BlockAddress";
import BlockAddress from "../features/BlockAddress/BlockAddress";

export function HomePage() {
  const [blockNumber, setBlockNumber] = useState<string | number>(0);
  const { data: block, isLoading } = useBlockQuery(Number(blockNumber));

  const client = new Alchemy({
    apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  });

  const getCurrentBlock = async () => {
    const latestBlockNumber = await client.core.getBlockNumber();

    setBlockNumber(latestBlockNumber);
  }

  useEffect(() => {
    getCurrentBlock();
  }, []);

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      padding="md"
    >
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
              <ActionIcon variant="subtle">
                <IconArrowLeft />
              </ActionIcon>
              <NumberInput
                placeholder="Enter a numer"
                rightSection={<></>}
                variant="unstyled"
                autoFocus
                size="xl"
                min={1}
                prefix="#"
                w={"auto"}
                value={blockNumber}
                onChange={setBlockNumber}
              />
              <ActionIcon variant="subtle">
                <IconArrowRight />
              </ActionIcon>
            </Group>
          </Stack>
          {
            isLoading && <Loader />
          }
          {
            block &&
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
