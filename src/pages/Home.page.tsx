import { Accordion, ActionIcon, AppShell, Button, Card, Center, Collapse, Grid, Group, NumberInput, Stack, Text, Title } from "@mantine/core";
import { Alchemy, BlockWithTransactions, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Block } from "../models/Block";
import ColorThemeSwitcher from "../components/ColorThemeSwitcher/ColorThemeSwitcher";
import { IconArrowRight, IconCube, IconExternalLink, IconLink } from '@tabler/icons-react';
import { useDisclosure } from "@mantine/hooks";

export function HomePage() {
  const [blockNumber, setBlockNumber] = useState<string | number>(1);
  const [block, setBlock] = useState<BlockWithTransactions>();
  const [transactionsOpened, transactionsHandle] = useDisclosure(false);

  const settings = {
    apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  const client = new Alchemy(settings);

  const showBlock = async (blockNumber: number) => {
    if (blockNumber <= 0) return;

    const block: BlockWithTransactions = await client.core.getBlockWithTransactions(blockNumber);

    setBlock(block);
  }

  const getCurrentBlock = async () => {
    const latestBlockNumber: number = await client.core.getBlockNumber();

    setBlockNumber(latestBlockNumber);

    showBlock(latestBlockNumber)
  }

  useEffect(() => {
    getCurrentBlock();
  }, []);

  const onChangeBlockNumber = async (blockNumber: string | number) => {

    setBlockNumber(blockNumber);

    showBlock(Number(blockNumber));
  }


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
        <Center>
          <Stack gap={"xl"} align="center">
            <Group justify="center">
              <Title ff={"mono"} lts={10}>show me the block #</Title>
              <NumberInput
                placeholder="Enter a numer"
                autoFocus
                size="xl"
                w={"20%"}
                value={blockNumber}
                onChange={onChangeBlockNumber}
              />
            </Group>
            {
              block &&
              <Card withBorder radius={"lg"} shadow="md" miw={800}>
                <Card.Section inheritPadding py={"md"} withBorder>
                  <Group justify="space-between">
                    <Group>
                      <Title order={3}>Block #{block.number}</Title>
                      <ActionIcon size={"sm"} component="a" target="_blank" href={`https://etherscan.io/block/${block.number}`} variant="transparent">
                        <IconExternalLink />
                      </ActionIcon>
                    </Group>
                    <Text size="sm">{block.timestamp}</Text>
                  </Group>
                </Card.Section>
                <Stack my={"xl"}>
                  <Grid>
                    <Grid.Col span={2}>
                      <Text>Miner</Text>
                    </Grid.Col>
                    <Grid.Col span={10}>
                      <Text>{block.miner}</Text>
                    </Grid.Col>
                  </Grid>

                  <Button onClick={transactionsHandle.toggle} variant="subtle">Transactions ({block.transactions.length})</Button>

                  <Collapse in={transactionsOpened}>
                    <Accordion variant="" chevron="">
                      {
                        block.transactions.map(transaction => {
                          return (
                            <Accordion.Item key={transaction.hash} value={transaction.hash}>
                              <Accordion.Control>
                                <Group>
                                  <Text>{transaction.from}</Text>
                                  <Text><IconArrowRight /></Text>
                                  <Text>{transaction.value._hex}</Text>
                                  <Text><IconArrowRight /></Text>
                                  <Text>{transaction.to}</Text>
                                </Group>
                              </Accordion.Control>
                            </Accordion.Item>
                          )
                        })
                      }
                    </Accordion>
                  </Collapse>
                </Stack>
              </Card>
            }
          </Stack>
        </Center>
      </AppShell.Main>
      <AppShell.Footer withBorder={false}>
        <Group h={"100%"} justify="center">
          <Text size="sm">2024 nfpsaraiva</Text>
        </Group>
      </AppShell.Footer>
    </AppShell >
  );
}
